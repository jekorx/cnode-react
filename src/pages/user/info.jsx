import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import UserHeader from '@components/userheader'
import Icon from '@components/icon'
import { getTimeInfo } from '@utils'
import styles from '@styles/user'

export default class Info extends PureComponent {
  static propTypes = {
    info: PropTypes.object.isRequired
  }
  render () {
    const { avatarUrl, loginname, createAt, githubUsername, score } = this.props.info
    return (
      <Fragment>
        <UserHeader
          name={loginname}
          avatar={avatarUrl}
        />
        <p className={styles.text}>
          <Icon type="score" className={styles.icon} />
          {score} 积分
          <a
            className={styles.github}
            href={`https://github.com/${githubUsername}`}
          >
            <Icon type="github" className={styles.icon} />
            {githubUsername}
          </a>
        </p>
        <p className={styles.text}>注册时间 {getTimeInfo(createAt)}</p>
      </Fragment>
    )
  }
}
