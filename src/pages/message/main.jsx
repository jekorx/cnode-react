import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { PullToRefresh, ListView } from 'antd-mobile'
import $http from '@api'
import indicator from '@components/indicator'
import BackTop from '@components/backtop'
import Item from './item'
import Title from './title'

@inject('_GV_', 'user')
@observer
export default class Main extends Component {
  static propTypes = {
    _GV_: PropTypes.shape({
      setTitle: PropTypes.func.isRequired,
      headerHeight: PropTypes.number.isRequired
    }).isRequired,
    user: PropTypes.shape({
      accessToken: PropTypes.string.isRequired
    }).isRequired
  }
  state = {
    dataSource: new ListView.DataSource({
      // 当id或者loginname改变时表示该行数据发生变化
      rowHasChanged: (row1, row2) => row1.id !== row2.id
    }), // listview数据源
    pageSize: 14,
    height: 0,
    showBackTop: false,
    refreshing: false
  }
  componentDidMount () {
    const { headerHeight, setTitle } = this.props._GV_
    setTitle({ path: '/message' })
    this.setState({
      height: (document.documentElement.clientHeight || document.body.clientHeight) - headerHeight
    }, this.queryData)
  }
  queryData = () => {
    const { accessToken } = this.props.user
    $http.get(`/messages?accesstoken=${accessToken}`).then(({ success, data }) => {
      if (success) {
        const { dataSource } = this.state
        const list = [
          { // hasnot_read_messages的标题
            type: 'MESSAGES',
            title: '新消息',
            icon: 'list'
          },
          ...data.hasnot_read_messages,
          { // has_read_messages的标题
            type: 'MESSAGES',
            title: '过往信息',
            icon: 'collections'
          },
          ...data.has_read_messages
        ]
        this.setState({
          dataSource: dataSource.cloneWithRows(list),
          refreshing: false
        })
      }
    })
  }
  // 下拉刷新
  handleRefresh = () => {
    this.setState({
      refreshing: true
    }, this.queryData)
  }
  // 滚动事件，控制返回顶部按钮显示隐藏
  handleScroll = e => {
    this.setState({
      showBackTop: e.target.scrollTop > 200
    })
  }
  // 返回顶部
  handleBackTop = () => {
    this.setState({
      showBackTop: false
    }, () => {
      this.listViewRef.scrollTo(0)
    })
  }
  render () {
    const { dataSource, height, showBackTop, refreshing, pageSize } = this.state
    return (
      <Fragment>
        <ListView
          ref={e => { this.listViewRef = e }}
          dataSource={dataSource}
          pageSize={pageSize}
          style={{ height, overflow: 'auto' }}
          onScroll={this.handleScroll}
          scrollEventThrottle={800}
          scrollRenderAheadDistance={400}
          pullToRefresh={
            <PullToRefresh
              refreshing={refreshing}
              onRefresh={this.handleRefresh}
              indicator={indicator}
            />
          }
          renderRow={(rowData, sectionID, rowID) =>
            rowData.type === 'MESSAGES'
              // 如果是标题，渲染标题
              ? <Title data={rowData} />
              // 渲染列表
              : <Item data={rowData} />
          }
        />
        <BackTop
          show={showBackTop}
          handleClick={this.handleBackTop}
        />
      </Fragment>
    )
  }
}
