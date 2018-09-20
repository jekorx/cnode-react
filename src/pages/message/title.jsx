import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Icon from '@components/icon'
import styles from '@styles/message'

export default class Title extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired
  }
  render () {
    const { title, icon } = this.props.data
    return (
      <h3 className={styles.type}>
        <Icon type={icon} className={styles['type-icon']} />
        <span className={styles['type-text']}>
          {title}
        </span>
      </h3>
    )
  }
}
