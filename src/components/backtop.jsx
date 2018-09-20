import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Icon from '@components/icon'
import styles from '@styles/components'

export default class BackTop extends PureComponent {
  static propTypes = {
    show: PropTypes.bool,
    handleClick: PropTypes.func
  }
  render () {
    const { show, handleClick } = this.props
    return (
      <span
        className={styles['back-top']}
        style={{ display: show ? '' : 'none' }}
        onClick={handleClick}
      >
        <Icon
          type="rocket"
          className={styles['back-top-icon']}
        />
      </span>
    )
  }
}
