import { observable, action } from 'mobx'
import { setCookie, getCookie, removeCookie } from '@utils'

// 保存用户信息的cookie名
const USERINFOCOOKIE = '__UTOKEN__'

export default class User {
  constructor () {
    // 初始化时获取cookie中保存的用户信息，加载到mobx
    let val = getCookie(USERINFOCOOKIE)
    if (val) {
      val = JSON.parse(unescape(val))
      this.setUserInfo(val)
    }
  }

  // 用户信息
  @observable id = ''
  @observable name = ''
  @observable avatar = ''
  @observable isLogin = false
  @observable accessToken = ''
  @observable msgCount = 0

  // 设置用户信息，保存到cookie
  @action.bound setUserInfo ({ id, name, avatar, isLogin, accessToken }) {
    this.id = id
    this.name = name
    this.avatar = avatar
    this.isLogin = isLogin
    this.accessToken = accessToken
    let info = { id, name, avatar, isLogin, accessToken }
    info = escape(JSON.stringify(info))
    setCookie(USERINFOCOOKIE, info)
  }
  // 清空用户信息，包括cookie
  @action.bound clearUserInfo () {
    this.id = ''
    this.name = ''
    this.avatar = ''
    this.isLogin = false
    this.accessToken = ''
    this.msgCount = 0
    removeCookie(USERINFOCOOKIE)
  }
  // 设置消息条数
  @action.bound setMsgCount (num) {
    this.msgCount = num
  }
}
