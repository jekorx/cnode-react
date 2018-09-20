import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Tag from '@components/tag'
import styles from '@styles/list'
import { getTimeInfo } from '@utils'

export default class Item extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired
  }
  render () {
    const { data } = this.props
    const path = `/topic/${data.id}`
    return (
      <Link to={path} className={styles.list}>
        <div className={styles.top}>
          <Tag
            good={data.good}
            top={data.top}
            tab={data.tab}
          />
          <h3 className={styles.title}>{data.title}</h3>
        </div>
        <div className={styles.bottom}>
          <span
            className={styles.avatar}
            style={{ backgroundImage: `url(${data.author.avatar_url})` }}
          />
          <div className={styles.info}>
            <p className={styles.cnt}>
              <span className={styles.left}>
                {data.author.loginname}
              </span>
              <span className={styles.right}>
                {data.reply_count} / {data.visit_count}
              </span>
            </p>
            <p className={styles.cnt}>
              <span className={styles.left}>
                {getTimeInfo(data.create_at)}
              </span>
              <span className={styles.right}>
                {getTimeInfo(data.last_reply_at)}
              </span>
            </p>
          </div>
        </div>
      </Link>
    )
  }
}
