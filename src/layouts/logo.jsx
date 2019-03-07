import React, { PureComponent } from 'react'
import styles from '@styles/layouts.module.scss'

export default class Logo extends PureComponent {
  render () {
    return (
      <span className={styles.logo}></span>
    )
  }
}
