import React from 'react'
import styles from '@styles/layouts.module.scss'

export default {
  activate: <div className={styles.indicator}>松开立即刷新</div>,
  deactivate: <div className={styles.indicator}>下拉可刷新</div>,
  finish: <div className={styles.indicator}>完成刷新</div>
}
