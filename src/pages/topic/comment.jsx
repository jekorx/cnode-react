import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Toast } from 'antd-mobile'
import styles from '@styles/topic'
import $http from '@api'

export default class Comment extends PureComponent {
  static propTypes = {
    atk: PropTypes.string,
    topicId: PropTypes.string,
    replyId: PropTypes.string,
    replayName: PropTypes.string,
    handleSucc: PropTypes.func,
    handleCancel: PropTypes.func
  }
  state = {
    content: ''
  }
  componentDidMount () {
    const { replayName } = this.props
    if (replayName) {
      this.setState({
        content: `[@${replayName}](/user/${replayName}) `
      })
    }
  }
  handleInput = ({ target }) => {
    this.setState({
      content: target.value
    })
  }
  handleCommit = () => {
    const { content } = this.state
    if (!content) {
      Toast.fail('请输入回复内容！', 1)
      return
    }
    const { atk, topicId, replyId, handleSucc } = this.props
    $http.post(`topic/${topicId}/replies`, Object.assign({
      accesstoken: atk,
      content
    }, replyId ? {
      reply_id: replyId
    } : {})).then(({ success }) => {
      if (success) {
        Toast.success('回复成功！', 0)
        this.setState({
          content: ''
        })
        setTimeout(handleSucc, 1000)
      }
    })
  }
  render () {
    const { content } = this.state
    const { handleCancel } = this.props
    return (
      <div className={styles.comment}>
        <textarea
          placeholder="支持Markdown语法"
          className={styles.textarea}
          value={content}
          onChange={this.handleInput}
        ></textarea>
        <div className={styles.btns}>
          <Button
            inline
            size="small"
            type="primary"
            className={styles.btn}
            onClick={this.handleCommit}
          >回复</Button>
          {handleCancel && <Button
            inline
            size="small"
            type="ghost"
            className={styles.btn}
            onClick={handleCancel}
          >取消</Button>}
        </div>
      </div>
    )
  }
}
