import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Icon from '@components/icon'
import styles from '@styles/layouts'

@inject('_GV_', 'user')
@observer
class Logout extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    _GV_: PropTypes.shape({
      drawerChange: PropTypes.func.isRequired
    }).isRequired,
    user: PropTypes.shape({
      isLogin: PropTypes.bool.isRequired,
      clearUserInfo: PropTypes.func.isRequired
    }).isRequired
  }
  handleLogout = () => {
    const {
      user: { clearUserInfo },
      _GV_: { drawerChange },
      history: { push }
    } = this.props
    clearUserInfo()
    drawerChange()
    push('/')
  }
  render () {
    return (
      <Fragment>
        <li className={styles.divider}></li>
        <li onClick={this.handleLogout}>
          <span className={styles.link}>
            <Icon type="logout" className={styles['link-icon']} />
            <span className={styles['link-title']}>退出</span>
          </span>
        </li>
      </Fragment>
    )
  }
}

export default withRouter(Logout)
