import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { Button, InputItem, Toast } from 'antd-mobile'
import $http from '@api'
import styles from '@styles/login.module.scss'

@inject('_GV_', 'user')
@observer
export default class Main extends Component {
  constructor (props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
  }
  static propTypes = {
    _GV_: PropTypes.shape({
      setTitle: PropTypes.func.isRequired
    }).isRequired,
    user: PropTypes.shape({
      isLogin: PropTypes.bool.isRequired,
      setUserInfo: PropTypes.func.isRequired
    }).isRequired
  }
  state = {
    loading: false
  }
  componentDidMount () {
    this.inputRef && this.inputRef.focus()
    this.props._GV_.setTitle({ path: '/login' })
  }
  async handleLogin (e) {
    e.preventDefault()
    const accessToken = this.inputRef.state.value
    if (!accessToken) {
      Toast.fail('请输入Access Token！', 1)
      return
    }
    let res = await $http.post('accesstoken', {
      accesstoken: accessToken
    })
    if (res.success) {
      Toast.success('登录成功！', 0)
      setTimeout(() => {
        this.props.user.setUserInfo({
          id: res.id,
          name: res.loginname,
          avatar: res.avatar_url,
          isLogin: true,
          accessToken
        })
      }, 1000)
    }
  }
  render () {
    const { loading } = this.state
    return (
      <form className={styles.form}>
        <InputItem
          ref={e => { this.inputRef = e }}
          clear
          placeholder="Access Token"
          className={styles['ignore-input']}
        />
        <Button
          type="primary"
          loading={loading}
          disabled={loading}
          onClick={this.handleLogin}
        >登录</Button>
      </form>
    )
  }
}
