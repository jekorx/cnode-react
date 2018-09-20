import { Toast } from 'antd-mobile'

const baseURL = 'https://cnodejs.org/api/v1/'
const config = {
  mode: 'cors'
}

export default {
  async get (url) {
    Toast.loading('加载中', 0)
    let result = await fetch(`${baseURL}${url}`, {
      ...config,
      method: 'GET'
    }).then(res => res.text())
    Toast.hide()
    return JSON.parse(result)
  },
  async post (url, data) {
    Toast.loading('加载中', 0)
    let result = await fetch(`${baseURL}${url}`, {
      ...config,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(data).toString()
    }).then(res => res.text())
    Toast.hide()
    return JSON.parse(result)
  }
}
