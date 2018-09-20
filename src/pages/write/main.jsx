import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Form from './form'

@inject('_GV_', 'user')
@observer
class Main extends Component {
  static propTypes = {
    user: PropTypes.shape({
      accessToken: PropTypes.string.isRequired
    }).isRequired,
    _GV_: PropTypes.shape({
      setTitle: PropTypes.func.isRequired
    }).isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object.isRequired
    }).isRequired
  }
  componentDidMount () {
    const { history, _GV_: { setTitle } } = this.props
    setTitle({ path: history.location.pathname })
  }
  handleSaved = () => {
    const { history } = this.props
    history.goBack()
  }
  render () {
    const { user: { accessToken }, match: { params } } = this.props
    return (
      <Form
        atk={accessToken}
        topicId={params.id}
        handleSaved={this.handleSaved}
      />
    )
  }
}

export default withRouter(Main)
