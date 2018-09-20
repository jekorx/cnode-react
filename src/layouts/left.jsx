import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { Drawer } from 'antd-mobile'
import Menu from './menu'

@inject('_GV_')
@observer
export default class Left extends Component {
  static propTypes = {
    _GV_: PropTypes.shape({
      drawer: PropTypes.bool.isRequired,
      drawerChange: PropTypes.func.isRequired
    }).isRequired
  }
  render () {
    const { drawer, drawerChange } = this.props._GV_
    return (
      <Drawer
        position="right"
        open={drawer}
        onOpenChange={drawerChange}
        sidebar={<Menu />}
      >
        <div></div>
      </Drawer>
    )
  }
}
