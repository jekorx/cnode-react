import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { PullToRefresh, ListView } from 'antd-mobile'
import BackTop from '@components/backtop'
import indicator from '@components/indicator'
import Item from './item'
import Footer from './footer'
import $http from '@api'

@inject('_GV_')
@observer
export default class Main extends Component {
  constructor (props) {
    super(props)
    this.queryData = this.queryData.bind(this)
  }
  static propTypes = {
    _GV_: PropTypes.shape({
      setTitle: PropTypes.func.isRequired,
      headerHeight: PropTypes.number.isRequired
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired
  }
  state = {
    dataSource: new ListView.DataSource({
      // 当id改变时表示该行数据发生变化
      rowHasChanged: (row1, row2) => row1.id !== row2.id
    }), // listview数据源
    list: [], // 加载后数据存放
    loading: true,
    refreshing: false,
    hasMore: true,
    pageNo: 1,
    pageSize: 7,
    tab: '',
    showBackTop: false,
    height: 0
  }
  // 首次加载根据类型请求数据
  componentDidMount () {
    const {
      location: { pathname },
      _GV_: { headerHeight }
    } = this.props
    const tab = pathname.substr(1) || 'all'
    this.props._GV_.setTitle({ path: pathname })
    this.setState({
      tab,
      height: (document.documentElement.clientHeight || document.body.clientHeight) - headerHeight
    }, () => {
      this.queryData()
    })
  }
  // 获取数据
  async queryData () {
    this.setState({ loading: true })
    const { pageNo, pageSize, tab } = this.state
    let { success, data } = await $http.get(`topics?tab=${tab}&page=${pageNo}&limit=${pageSize}&mdrender=false`)
    if (success) {
      if (data && data.length > 0) {
        let list = [...this.state.list, ...data]
        const { dataSource, pageNo } = this.state
        this.setState({
          dataSource: dataSource.cloneWithRows(list),
          list,
          pageNo: pageNo + 1,
          loading: false,
          refreshing: false
        })
      } else {
        this.setState({
          loading: false,
          hasMore: false,
          refreshing: false
        })
      }
    }
  }
  // 加载更多
  handleEndReached = () => {
    const { loading, hasMore } = this.state
    if (loading && !hasMore) return
    this.queryData()
  }
  // 下拉刷新
  handleRefresh = () => {
    this.setState({
      list: [],
      pageNo: 1,
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
    const { dataSource, loading, refreshing, pageSize, height, showBackTop } = this.state
    return (
      <Fragment>
        <ListView
          ref={e => { this.listViewRef = e }}
          dataSource={dataSource}
          pageSize={pageSize}
          style={{ height, overflow: 'auto' }}
          scrollEventThrottle={800}
          onEndReachedThreshold={400}
          scrollRenderAheadDistance={400}
          onScroll={this.handleScroll}
          onEndReached={this.handleEndReached}
          renderFooter={() =>
            loading && <Footer />
          }
          renderRow={rowData =>
            <Item key={rowData.id} data={rowData} />
          }
          pullToRefresh={
            <PullToRefresh
              refreshing={refreshing}
              onRefresh={this.handleRefresh}
              indicator={indicator}
            />
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
