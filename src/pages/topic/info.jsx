import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { Button, Toast } from 'antd-mobile'
import styles from '@styles/topic'
import { getTimeInfo, checkLogin } from '@utils'
import $http from '@api'
import types from '@src/json/types'

class Info extends PureComponent {
  static propTypes = {
    atk: PropTypes.string,
    topic: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }
  state = {
    isCollect: false
  }
  componentDidMount () {
    this.setState({
      isCollect: this.props.topic.is_collect
    })
  }
  handleCollect = () => {
    const { topic: { id }, atk, history } = this.props
    // 检查是否登录
    if (!checkLogin(atk, history)) return
    const { isCollect } = this.state
    $http.post(`topic_collect/${isCollect ? 'de_collect ' : 'collect '}`, {
      accesstoken: atk,
      topic_id: id
    }).then(({ success, error_msg: errorMsg }) => {
      if (success) {
        this.setState({
          isCollect: !isCollect
        })
      } else {
        Toast.fail(errorMsg, 1)
      }
    })
  }
  render () {
    const { topic } = this.props
    const { isCollect } = this.state
    return (
      <section className={styles.info}>
        <Link to={`/user/${topic.author.loginname}`}>
          <span
            className={styles.avatar}
            style={{ backgroundImage: `url(${topic.author.avatar_url})` }}
          />
        </Link>
        <div className={styles.center}>
          <span>{topic.author.loginname} · 发布于 {getTimeInfo(topic.create_at)}</span>
          <span>来自 {types[topic.tab]} · {topic.visit_count} 次浏览</span>
        </div>
        <div className={styles['collect-wrap']}>
          <Button
            inline
            size="small"
            className={styles.collect}
            onClick={this.handleCollect}
            type={isCollect ? 'ghost' : 'primary'}
          >{isCollect ? '取消收藏' : '收藏'}</Button>
        </div>
      </section>
    )
  }
}

export default withRouter(Info)
