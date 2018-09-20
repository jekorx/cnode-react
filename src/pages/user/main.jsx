import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { PullToRefresh, ListView } from 'antd-mobile'
import $http from '@api'
import BackTop from '@components/backtop'
import indicator from '@components/indicator'
import Info from './info'
import Item from './item'
import Title from './title'

@inject('_GV_')
@observer
class Main extends Component {
  constructor (props) {
    super(props)
    this.queryData = this.queryData.bind(this)
  }
  static propTypes = {
    _GV_: PropTypes.shape({
      setTitle: PropTypes.func.isRequired,
      headerHeight: PropTypes.number.isRequired
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.object.isRequired
    }).isRequired
  }
  state = {
    dataSource: new ListView.DataSource({
      // 当id或者loginname改变时表示该行数据发生变化
      rowHasChanged: (row1, row2) => (row1.id !== row2.id) || (row1.loginname !== row2.loginname)
    }), // listview数据源
    name: '',
    pageSize: 14,
    height: 0,
    showBackTop: false,
    refreshing: false
  }
  componentDidMount () {
    const {
      match: { params },
      _GV_: { headerHeight, setTitle }
    } = this.props
    const { name } = params
    setTitle({ title: `@${name} 的个人主页` })
    this.setState({
      name,
      height: (document.documentElement.clientHeight || document.body.clientHeight) - headerHeight
    }, this.queryData)
  }
  componentDidUpdate (prevProps) {
    const {
      match: { params: { name } },
      _GV_: { setTitle }
    } = this.props
    // 仅当当前参数name发生变化时重新加载数据
    if (name !== prevProps.match.params.name) {
      setTitle({ title: `@${name} 的个人主页` })
      this.setState({ name }, this.queryData)
    }
  }
  async queryData () {
    const { name } = this.state
    let res = await $http.get(`user/${name}`)
    let collect = await $http.get(`topic_collect/${name}`)
    const { success, data } = res
    if (success) {
      const cData = (collect.success && collect.data) ? collect.data : []
      const { dataSource } = this.state
      const list = [
        { // 个人信息部分 索引 0
          avatarUrl: data.avatar_url,
          createAt: data.create_at,
          githubUsername: data.githubUsername,
          loginname: data.loginname,
          score: data.score
        },
        { // recent_topics的标题
          type: 'RECENT_TITLE',
          title: '最近创建的话题',
          icon: 'msg'
        },
        // 最近创建的话题
        ...data.recent_topics,
        { // recent_replies的标题
          type: 'RECENT_TITLE',
          title: '最近参与的话题',
          icon: 'reply'
        },
        // 最近参与的话题
        ...data.recent_replies,
        { // recent_collect的标题
          type: 'RECENT_TITLE',
          title: '收藏的话题',
          icon: 'collections'
        },
        ...cData
      ]
      this.setState({
        dataSource: dataSource.cloneWithRows(list),
        refreshing: false
      })
    }
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
            +rowID === 0
              // 第一个渲染个人信息
              ? <Info info={rowData} />
              : (
                rowData.type === 'RECENT_TITLE'
                  // 如果是标题，渲染标题
                  ? <Title data={rowData} />
                  // 渲染列表
                  : <Item data={rowData} />
              )
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

export default withRouter(Main)
