import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from '@styles/components.module.scss'

export default class UserHeader extends PureComponent {
  static propTypes = {
    avatar: PropTypes.string,
    name: PropTypes.string,
    onClick: PropTypes.func
  }
  render () {
    const { avatar, name, onClick } = this.props
    return (
      <figure className={styles.user} onClick={onClick}>
        <div
          className={styles.avatar}
          style={{ backgroundImage: `url(${avatar})` }}
        ></div>
        <figcaption>{name}</figcaption>
      </figure>
    )
  }
}
