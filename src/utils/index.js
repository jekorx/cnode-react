// 时间戳转换
export const getTimeInfo = str => {
  if (!str) return ''
  const date = new Date(str)
  const time = new Date().getTime() - date.getTime() // 现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
  if (time < 0) return ''
  if (time / 1000 < 60) return '刚刚'
  if (time / 60000 < 60) return parseInt(time / 60000, 10) + '分钟前'
  if (time / 3600000 < 24) return parseInt(time / 3600000, 10) + '小时前'
  if (time / 86400000 < 31) return parseInt(time / 86400000, 10) + '天前'
  if (time / 2592000000 < 12) return parseInt(time / 2592000000, 10) + '月前'
  return parseInt(time / 31536000000, 10) + '年前'
}
// 存储cookie
export const setCookie = (key, value, days = 30) => {
  let d = new Date()
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000))
  let expires = `; expires=${d.toGMTString()}`
  document.cookie = `${key}=${value}${expires}`
}
// 获取cookie
export const getCookie = key => {
  let reg = new RegExp(`(^| )${key}=([^;]*)(;|$)`)
  let arr = document.cookie.match(reg)
  let val = null
  if (arr && arr.length > 2) {
    val = arr[2]
  }
  return val
}
// 删除cookie
export const removeCookie = key => {
  let value = getCookie(key)
  setCookie(key, value, -1)
}
// 检查是否登录
export const checkLogin = (atk, history) => {
  if (atk === '') {
    history.replace('/login', {
      from: history.location
    })
    return false
  }
  return true
}
// 防抖函数
export const debounce = (fn, delay = 800) => {
  let timer = null
  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => fn && fn(), delay)
  }
}
// 节流函数
export const throttle = (fn, delay = 800) => {
  let lastTime = null
  return () => {
    let now = +new Date()
    if (now - lastTime > delay || !lastTime) {
      fn && fn()
      lastTime = now
    }
  }
}
