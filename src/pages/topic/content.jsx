import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd-mobile'
import { Link } from 'react-router-dom'
import Tag from '@components/tag'
import Icon from '@components/icon'
import Info from './info'
import styles from '@styles/topic.module.scss'
import InnerHTML from '@components/innerhtml'
import Comment from './comment'

export default class Content extends Component {
  static propTypes = {
    handleSucc: PropTypes.func,
    topic: PropTypes.object,
    atk: PropTypes.string,
    authorId: PropTypes.string
  }
  state = {
    showComment: false
  }
  handleToggleReply = () => {
    this.setState({
      showComment: !this.state.showComment
    })
  }
  handleSucc = () => {
    this.handleToggleReply()
    this.props.handleSucc()
  }
  render () {
    const { topic, atk, authorId } = this.props
    const { showComment } = this.state
    return (
      <div className={styles.topic}>
        <h2 className={styles['title-wrap']}>
          {(topic.good || topic.top) && <span className={styles['tag-wrap']}>
            <Tag
              good={topic.good}
              top={topic.top}
              tab={topic.tab}
              className={styles.tag}
            />
          </span>}
          <span className={styles.title}>{topic.title}</span>
          {authorId === topic.author_id && <Link to={`/edit/${topic.id}`}>
            <Icon type="edit" className={styles.edit} />
          </Link>}
        </h2>
        {topic.author && <Info topic={topic} atk={atk} authorId={authorId} />}
        <InnerHTML cnt={topic.content} />
        <h3 className={styles['reply-header']}>
          <strong>
            <span className={styles['reply-count']}>{topic.reply_count}</span>
            回复
          </strong>
          <Button
            inline
            size="small"
            type="ghost"
            className={styles['reply-add']}
            onClick={this.handleToggleReply}
          >{showComment ? '取消' : '添加回复'}</Button>
        </h3>
        <div style={{ display: showComment ? 'block' : 'none' }}>
          <Comment
            atk={atk}
            topicId={topic.id}
            handleSucc={this.handleSucc}
          />
        </div>
      </div>
    )
  }
}
