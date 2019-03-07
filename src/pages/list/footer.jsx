import React, { PureComponent } from 'react'
import styles from '@styles/list.module.scss'

export default class Footer extends PureComponent {
  render () {
    return (
      <div className={styles.loading}>加载中...</div>
    )
  }
}
