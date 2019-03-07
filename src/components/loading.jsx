import React from 'react'
import styles from '@styles/components.module.scss'

export default function Loading ({ error, pastDelay }) {
  if (error) {
    return <div className={styles.error}></div>
  } else if (pastDelay) {
    return <div className={styles.loading}></div>
  } else {
    return null
  }
}
