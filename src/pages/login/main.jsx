import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import Form from './form'

@inject('user')
@observer
export default class Main extends Component {
  static propTypes = {
    user: PropTypes.shape({
      isLogin: PropTypes.bool.isRequired
    }).isRequired,
    location: PropTypes.shape({
      state: PropTypes.object
    })
  }
  render () {
    const {
      user: { isLogin },
      location: { state }
    } = this.props
    let to = { pathname: '/' }
    if (state) {
      to = state.from
    }
    return isLogin
      ? <Redirect to={to} />
      : <Form />
  }
}
