import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import Icon from '@components/icon'
import UserHeader from '@components/userheader'
import styles from '@styles/layouts'
import $http from '@api'

@inject('_GV_', 'user')
@observer
class User extends Component {
  constructor (props) {
    super(props)
    this.queryMsgCount = this.queryMsgCount.bind(this)
  }
  static propTypes = {
    history: PropTypes.object.isRequired,
    _GV_: PropTypes.shape({
      drawerChange: PropTypes.func.isRequired
    }).isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      accessToken: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      isLogin: PropTypes.bool.isRequired,
      setMsgCount: PropTypes.func.isRequired
    }).isRequired
  }
  componentDidMount () {
    setTimeout(this.queryMsgCount, 0)
  }
  componentDidUpdate () {
    this.queryMsgCount()
  }
  async queryMsgCount () {
    const { accessToken, setMsgCount } = this.props.user
    if (!accessToken) return
    let { success, data } = await $http.get(`/message/count?accesstoken=${accessToken}`)
    success && setMsgCount(data)
  }
  handleUserClick = () => {
    const {
      history,
      _GV_: { drawerChange },
      user: { name }
    } = this.props
    const pathname = `/user/${name}`
    if (history.location.pathname !== pathname) {
      history.push(pathname)
    }
    drawerChange()
  }
  handleGoLogin = () => {
    const { _GV_: { drawerChange }, history } = this.props
    history.replace('/login', {
      from: history.location
    })
    drawerChange()
  }
  render () {
    const { name, avatar, isLogin } = this.props.user
    return isLogin
      ? <UserHeader
        name={name}
        avatar={avatar}
        onClick={this.handleUserClick}
      />
      : <div
        onClick={this.handleGoLogin}
        className={styles.login}
      >
        <Icon type="user" className={styles['login-icon']} />
        <span className={styles['login-text']}>登录</span>
      </div>
  }
}

export default withRouter(User)
