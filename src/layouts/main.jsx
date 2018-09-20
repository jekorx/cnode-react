import React, { Component, Fragment } from 'react'
import { routes, RouteViews } from '@routes'
import Header from './header'
import Left from './left'
import styles from '@styles/layouts'

export default class Main extends Component {
  render () {
    return (
      <Fragment>
        <Header />
        <Left />
        <div className={styles.content}>
          <RouteViews routes={routes} />
        </div>
      </Fragment>
    )
  }
}
