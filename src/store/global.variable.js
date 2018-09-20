import { observable, action } from 'mobx'
import menuData from '@src/json/menu'
import prevMenuData from '@src/json/prev.menu'
import secondMenuData from '@src/json/second.menu'
import notInMenuData from '@src/json/notin.menu'

export default class GV {
  constructor () {
    const { pathname } = window.location
    this.path = pathname.substr(pathname.lastIndexOf('/'))
    this.headerHeight = (document.documentElement.clientWidth || document.body.clientWidth) / 750 * 90
  }
  // 菜单
  menu = [...prevMenuData, ...menuData, ...secondMenuData]
  // 路由，菜单中显示的和不在菜单中显示的
  routes = [...this.menu, ...notInMenuData].filter(r => r.path)
  // 标题
  @observable title = ''
  // 左侧抽屉菜单状态
  @observable drawer = false
  // header高度
  @observable headerHeight = 0

  // 设置抽屉菜单状态切换
  @action.bound drawerChange () {
    this.drawer = !this.drawer
  }
  // 设置标题
  @action.bound setTitle ({ path, title }) {
    if (title) {
      this.title = title
    } else if (path) {
      let obj = this.routes.find(r => path.startsWith(r.path))
      this.title = obj ? obj.title : '全部'
    } else {
      this.title = ''
    }
  }
}
