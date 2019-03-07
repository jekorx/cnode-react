import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Icon from '@components/icon'
import Logout from './logout'
import styles from '@styles/layouts.module.scss'

import User from './user'

@inject('_GV_', 'user')
@observer
export default class Menu extends Component {
  static propTypes = {
    _GV_: PropTypes.shape({
      menu: PropTypes.array.isRequired,
      drawerChange: PropTypes.func.isRequired
    }).isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      msgCount: PropTypes.number.isRequired,
      isLogin: PropTypes.bool.isRequired
    }).isRequired
  }
  render () {
    const {
      user: { isLogin, msgCount },
      _GV_: { drawerChange, menu }
    } = this.props
    return (
      <ul className={styles.menu}>
        <li>
          <User />
        </li>
        <li className={styles.divider}></li>
        {menu.map((m, i) =>
          m.path
            ? <li key={m.path} onClick={drawerChange}>
              <Link to={m.path} className={styles.link}>
                {(m.badge && msgCount > 0) && <i className={styles['badge-num']}>
                  {msgCount > 99 ? '99+' : msgCount}
                </i>}
                <Icon type={m.icon} className={styles['link-icon']}/>
                <span className={styles['link-title']}>{m.title}</span>
              </Link>
            </li>
            : <li
              key={`divider${i}`}
              className={styles.divider}
            ></li>
        )}
        {isLogin && <Logout />}
      </ul>
    )
  }
}
