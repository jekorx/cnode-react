import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from '@styles/components'

export default class InnerHTML extends PureComponent {
  static propTypes = {
    cnt: PropTypes.string
  }
  render () {
    const { cnt } = this.props
    return (
      <section
        className={['markdown-body', styles.html].join(' ')}
        dangerouslySetInnerHTML={{
          __html: cnt
        }}
      ></section>
    )
  }
}
