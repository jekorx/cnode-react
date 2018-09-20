import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import styles from '@styles/about'

@inject('_GV_')
@observer
class About extends Component {
  static propTypes = {
    _GV_: PropTypes.shape({
      setTitle: PropTypes.func.isRequired
    }).isRequired,
    history: PropTypes.object.isRequired
  }
  componentDidMount () {
    const { history, _GV_: { setTitle } } = this.props
    setTitle({ path: history.location.pathname })
  }
  render () {
    return (
      <ul className={styles.about}>
        <li className={styles.item}>
          个人github地址：
          <a href="https://github.com/jekorx">
            https://github.com/jekorx
          </a>
        </li>
        <li className={styles.item}>
          基于
          <a href="https://cnodejs.org">
            CNode技术社区
          </a>
          api接口，可注册帐号，使用AccessToken登录
        </li>
        <li className={styles.item}>
          项目地址
          <a href="https://github.com/jekorx/react-cli/tree/mobile-cli">
            https://github.com/jekorx/react-cli
          </a>
          mobile-cli分支
        </li>
        <li className={[styles.item, 'markdown-body'].join(' ')}>
          <div className="markdown-text">
            <h3>mobile-cli</h3>
            <blockquote>
              <p>
                1、移动端模版分支，使用Ant Design Mobile作为UI框架<br />
                2、使用stylus，vw布局，支持css modules，必须是src目录下的.styl文件<br />
                3、<a href="https://jekorx.github.io/react-cli">访问地址</a>
                ，由于路由是history模式（无法配置github web服务器），在非/目录刷新会404
              </p>
            </blockquote>
          </div>
        </li>
      </ul>
    )
  }
}

export default withRouter(About)
