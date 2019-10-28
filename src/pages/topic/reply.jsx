import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { Toast } from 'antd-mobile'
import InnerHTML from '@components/innerhtml'
import Icon from '@components/icon'
import Comment from './comment'
import styles from '@styles/topic.module.scss'
import { getTimeInfo, checkLogin } from '@utils'
import $http from '@api'

class Replay extends PureComponent {
  static propTypes = {
    data: PropTypes.object,
    rowId: PropTypes.number,
    author: PropTypes.string,
    topicId: PropTypes.string,
    handleSucc: PropTypes.func,
    handleReply: PropTypes.func,
    handleCancel: PropTypes.func,
    atk: PropTypes.string,
    history: PropTypes.object.isRequired
  }
  state = {
    uped: false,
    count: 0
  }
  componentDidMount () {
    this.setState({
      uped: this.props.data.is_uped
    })
  }
  handleUp = () => {
    const { data: { id, is_uped: isUped }, atk, history } = this.props
    // 检查是否登录
    if (!checkLogin(atk, history)) return
    $http.post(`reply/${id}/ups `, {
      accesstoken: atk
    }).then(({ success, action, error_msg: errorMsg }) => {
      if (success) {
        this.setState({
          uped: action === 'up',
          count: isUped ? (action === 'down' ? -1 : 0) : (action === 'up' ? 1 : 0)
        })
      } else {
        Toast.fail(errorMsg, 1)
      }
    })
  }
  render () {
    const { data, rowId, atk, topicId, author, handleSucc, handleCancel, handleReply } = this.props
    const { uped, count } = this.state
    return (
      <div id={data.id} className={styles.reply}>
        <section className={styles.user}>
          <Link to={`/user/${data.author.loginname}`}>
            <span
              className={styles.avatar}
              style={{ backgroundImage: `url(${data.author.avatar_url})` }}
            />
          </Link>
          <div className={styles['reply-info']}>
            <span className={styles['reply-left']}>
              <span className={styles['reply-name']}>{data.author.loginname}</span>
              <a href={`#${data.id}`} className={styles.anchor}>
                {rowId} 楼 · {getTimeInfo(data.create_at)}
              </a>
              {data.author.loginname === author && <span className={styles['tag-author']}>作者</span>}
            </span>
            <span className={styles['reply-right']}>
              <Icon
                type={uped ? 'uped' : 'up'}
                className={styles['reply-icon']}
                onClick={this.handleUp}
              />
              <span className={styles['up-count']}>{data.ups.length + count}</span>
              <Icon
                type="reply"
                className={styles['reply-icon']}
                onClick={handleReply}
              />
            </span>
          </div>
        </section>
        <InnerHTML cnt={data.content} />
        {data.showComment && <Comment
          atk={atk}
          topicId={topicId}
          replyId={data.id}
          replayName={data.author.loginname}
          handleSucc={handleSucc}
          handleCancel={handleCancel}
        />}
      </div>
    )
  }
}

export default withRouter(Replay)
