import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

@inject('user')
@observer
export default class AuthRoute extends Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
    user: PropTypes.shape({
      isLogin: PropTypes.bool.isRequired
    }).isRequired
  }
  render () {
    const { component: WrapComponent, path } = this.props
    const { isLogin } = this.props.user
    return (
      <Route
        path={path}
        render={props => (
          isLogin
            ? <WrapComponent {...props} />
            : <Redirect to={{
              pathname: '/login',
              state: {
                from: props.location
              }
            }} />
        )}
      />
    )
  }
}
