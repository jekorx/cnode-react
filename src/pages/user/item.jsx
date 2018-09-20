import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from '@styles/user'
import { getTimeInfo } from '@utils'

export default class Item extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired
  }
  render () {
    const { data } = this.props
    const path = `/topic/${data.id}`
    return (
      <Link to={path} className={styles.link}>
        <h3 className={styles.title}>{data.title}</h3>
        <div className={styles.bottom}>
          <span
            className={styles.avatar}
            style={{ backgroundImage: `url(${data.author.avatar_url})` }}
          />
          <div className={styles.right}>
            <span>{data.author.loginname}</span>
            <span>最后回复 {getTimeInfo(data.last_reply_at)}</span>
          </div>
        </div>
      </Link>
    )
  }
}
