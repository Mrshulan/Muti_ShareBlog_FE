import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as uiActions } from '../../../redux/modules/ui'
import { actions as authActions } from '../../../redux/modules/auth'

import CommentsList from './commentsList'

import './index.less'
import { Comment, Avatar, Form, Button, Divider, Input, Icon, Menu, Dropdown, message } from 'antd'
import axios from '../../../utils/axios'

const { TextArea } = Input

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea row={4} placeholder="说点什么吧" onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <div className='controls'>
        <i className="iconfont icon-tips"></i>
        <span className='support-tip'>支持Markdown语法</span>
        <Button className="" htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          添加评论
        </Button>
      </div>
    </Form.Item>
  </div>
)

class ArticleComments extends Component {
  state = {
    submitting: false,
    value: ''
  }

  handleSubmit = () => {
    if (!this.state.value) {
      message.error('评论内容不能为空')
    }
    this.setState({ submitting: true })
    const content = this.state.value
    axios.put('/comment', {
      article: this.props.articleId,
      content
    }).then(res => {
      if(res.status === 200) {
        message.success(res.message)
        this.setState({ value: '' }, () => {
          const created = new Date()
          const newComment = {
            _id: created,
            from: {
              username: this.props.username,
              avatar: this.props.avatar,
            },
            content,
            created,
          }
          this.props.addCommentsList(newComment)
        })
      }
      this.setState({ submitting: false })    
    }).catch(err => {
      message.error(err.message)
      this.setState({ submitting: false })
    })
  }

  handleChange = (e) => {
    this.setState({value: e.target.value })
  }

  handleMenuClick = e => {
    let event = e.key
    if(event === 'login') {
      this.props.openAuthModal('login')
    } else if(event === 'register') {
      this.props.openAuthModal('register')
    } else if(event === 'logout') {
      this.props.logout()
    }
  }

  renderDropdownMenu = () => {
    const { username } = this.props
    return username ? (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="logout">
        <Icon type='user' />退出</Menu.Item>
      </Menu>
    ) : (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="login">登录</Menu.Item>
        <Menu.Item key="register">注册</Menu.Item>
      </Menu>
    )
  }

  render() {
    const { submitting, value } = this.state
    const { username, avatar, commentsList} = this.props

    return (
      <div className="comment-wrapper">
        <div className="comment-header">
          <span className="count">{commentsList.length}</span>
          {' '}条评论
          <span className="menu-wrap">
            <Dropdown overlay={this.renderDropdownMenu()} trigger={['click', 'hover']}>
              <span>
                {username ? username : '未登录用户'} <Icon type="down" />
              </span>
            </Dropdown>
          </span>
          <Divider className="hr" />
        </div>
        <Comment 
          avatar={(
            <Avatar
              src={"http://127.0.0.1:6001" + avatar}
              alt={username}
            />
          )}
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
        <CommentsList list={commentsList}></CommentsList>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  username: state.auth.username,
  avatar: state.auth.avatar
})

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(uiActions, dispatch),
    ...bindActionCreators(authActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleComments)
