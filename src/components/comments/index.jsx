import React, { Component } from 'react'
import { Comment, Avatar, Form, Button, Divider, Input, Icon, Menu, Dropdown, message } from 'antd'


import './index.less'

const { TextArea } = Input

const Editor = ({ onChange, onSubmit, submitting, value, articleId }) => (
  <div>
    <Form.Item>
      <TextArea row={4} placeholder="说点什么吧" onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <div className='controls'>
        <i className="iconfont icon-tips"></i>
        <span className='support-tip'>支持Markdown语法</span>
        <Button className="" htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          {articleId !== -1 ? '添加评论' : '留言'}
        </Button>
      </div>
    </Form.Item>
  </div>
)

class ArticleComment extends Component {
  state = {
    submitting: false,
    value: ''
  }


  handleSubmit = () => {
    if (!this.state.value) return
    console.log(this.state.value)
  }

  handleChange = (e) => {
    this.setState({value: e.target.value })
  }

  handleMenuClick = e => {
    let event = e.key
    if(event === 'login') {
      console.log('login')
    } else if(event === 'register') {
      console.log('register')
    } else if(event === 'logout') {
      console.log('logout')
    }
  }

  renderDropdownMenu = () => {
    // const { username } = this.props

    // return 'username' ? (
    //   <Menu onClick={this.handleMenuClick}>
    //     <Menu.Item key="logout">注销</Menu.Item>
    //   </Menu>
    // ) : (
    //   <Menu onClick={this.handleMenuClick}>
    //     <Menu.Item key="login">登录</Menu.Item>
    //     <Menu.Item key="register">注册</Menu.Item>
    //   </Menu>
    // )

    return (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="logout">注销</Menu.Item>
      </Menu>
    )
  }

  render() {
    const { submitting, value } = this.state

    return (
      <div className="comment-wrapper">
        <div className="comment-header">
          <span className="count">{'getCommentsCount(commentList)'}</span>{' '}
          {'articleId' !== -1 ? '条评论' : '条留言'}
          <span className="menu-wrap">
            <Dropdown overlay={this.renderDropdownMenu()} trigger={['click', 'hover']}>
              <span>
                {"username" ? "username" : '未登录用户'} <Icon type="down" />
              </span>
            </Dropdown>
          </span>
          <Divider className="hr" />
        </div>
        <Comment 
          avatar={(
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          )}
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
              articleId={'articleId'}
            />
          }
        />

      </div>
    )
  }
}

export default ArticleComment
