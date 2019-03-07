import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { hot } from 'react-hot-loader/root'
import store from '@store'
import Layouts from '@layouts'
import 'github-markdown-css'
import '@styles/global.css'
import '@styles'

const baseName = process.env.PUBLIC_URL || '/'

class App extends Component {
  render () {
    return (
      <Provider {...store}>
        <Router basename={baseName}>
          <Layouts />
        </Router>
      </Provider>
    )
  }
}

export default hot(App)
