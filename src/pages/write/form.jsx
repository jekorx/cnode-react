import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Picker, List, TextareaItem, InputItem, Button, Toast } from 'antd-mobile'
import styles from '@styles/write.module.scss'
import typesData from '@src/json/types'
import $http from '@api'

const { Item } = List

export default class Form extends PureComponent {
  static propTypes = {
    topicId: PropTypes.string,
    atk: PropTypes.string.isRequired,
    handleSaved: PropTypes.func.isRequired
  }
  state = {
    types: Object.entries(typesData).map(t => ({ value: t[0], label: t[1] })),
    title: '',
    tab: 'dev',
    content: ''
  }
  componentDidMount () {
    this.titleRef.focus()
    const { topicId } = this.props
    topicId && this.queryData(topicId)
  }
  queryData = id => {
    $http.get(`topic/${id}?mdrender=false`).then(({ success, data: { title, tab, content } }) => {
      success && this.setState({ title, tab, content })
    })
  }
  handleChange = (val, name) => {
    this.setState({
      [name]: (val instanceof Array && val.length > 0) ? val[0] : val
    })
  }
  handleCommit = e => {
    e.preventDefault()
    const { title, tab, content } = this.state
    const { atk, topicId, handleSaved } = this.props
    if (!tab) {
      Toast.fail('请选择板块！', 1)
      return
    }
    if (!title || title.length < 10) {
      Toast.fail('请输入10字以上的标题！', 1)
      return
    }
    if (!content) {
      Toast.fail('请输入主体内容！', 1)
      return
    }
    $http.post(`topics${topicId ? '/update' : ''}`, Object.assign({
      accesstoken: atk,
      title,
      tab,
      content
    }, topicId && {
      topic_id: topicId
    })).then(({ success, error_msg: errorMsg }) => {
      if (success) {
        Toast.success('保存成功！', 0)
        setTimeout(handleSaved, 1000)
      } else {
        Toast.fail(errorMsg, 2)
      }
    })
  }
  render () {
    const { types, tab, title, content } = this.state
    const tabName = typesData[tab]
    return (
      <List className={styles.container}>
        <Picker
          title="选择板块"
          cols={1}
          data={types}
          value={[tab]}
          onOk={val => this.handleChange(val, 'tab')}
        >
          <Item
            extra={tabName}
            className={[styles.item, styles.ignore].join(' ')}
            arrow="horizontal"
          >板块</Item>
        </Picker>
        <InputItem
          clear
          ref={e => { this.titleRef = e }}
          className={[styles.item, styles.ignore].join(' ')}
          value={title}
          placeholder="标题，字数10字以上"
          onChange={val => this.handleChange(val, 'title')}
        />
        <TextareaItem
          rows={10}
          value={content}
          placeholder="主体内容，支持Markdown语法"
          onChange={val => this.handleChange(val, 'content')}
        />
        <Item>
          <Button
            type="primary"
            onClick={this.handleCommit}
          >提交</Button>
        </Item>
      </List>
    )
  }
}
