import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class Item extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired
  }
  render () {
    const { data } = this.props
    return (
      <div>{data}</div>
    )
  }
}
