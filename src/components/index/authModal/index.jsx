import React, { Component } from 'react'
import { Modal, Input, Icon, message, Button  } from 'antd'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as authActions } from '../../../redux/modules/auth'
import { actions as uiActions } from '../../../redux/modules/ui'

class AuthModal extends Component {
  state = {
    type: '登录', 
    username: '',
    password: '',
    tellphone: ''
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.loginModalOpen) return { type: '登录' }
    if (nextProps.registerModalOpen) return { type: '注册' }
    return null
  }

  handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
    })
  }

  handleSubmit = () => {
    if(this.state.type === '登录') {
      const { username, password } = this.state

      if(username && password) {
        this.props.login({ username, password }).then(res => {
          if (res.status === 200) this.props.closeAuthModal('login')
        })
      } else {
        message.error('请务必填写完整')
      }
    
    } else if (this.state.type === '注册') {
      const reg = '^1[3|4|5|6|7|8]\\d{9}$'
      const { username, password, tellphone } = this.state

      if(username && password && tellphone){
        if(!new RegExp(reg).test(tellphone)) {
          message.error('请检查手机号')
          return
        }
        
        if(this.passwordConfirm.state.value === this.state.password) {     
          this.props.register({ username, password, tellphone}).then(res => {
            if (res.status === 200) {
              this.props.closeAuthModal('register')
              this.passwordConfirm.state.value = ''
            }
          })
        } else {
          message.error('两次密码不一致')
          this.passwordConfirm.state.value = ''
        }
      } else {
        message.error('请务必填写完整')
        this.passwordConfirm.state.value = ''
      }
    }

    this.setState({
      username: '',
      password: '',
      tellphone: ''
    })
  }

  handleCancel = () => {
    this.props.closeAuthModal(this.state.type === '登录' ?  'login' : 'register')
    this.setState({
      username: '',
      password: '',
      tellphone: ''
    })
    if(this.passwordConfirm) this.passwordConfirm.state.value = ''
  }


  render() {
    const { type } = this.state
    const { loginModalOpen, registerModalOpen} = this.props

    return (
      <Modal 
        title={type}
        style={{ top: '25%' }}
        visible={loginModalOpen || registerModalOpen}
        onCancel={this.handleCancel}
        width={400}
        footer={null}
      >
        <div className='authModal'>
          <Input 
            style={{ marginBottom: 20 }}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            name='username'
            placeholder="请输入你的用户名"
            value={this.state.username}
            onChange={this.handleChange}
            onPressEnter={this.handleSubmit}
          />
          <Input 
            style={{ marginBottom: 20 }}
            prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
            type='password'
            name='password'
            placeholder="请输入你的密码"
            value={this.state.password}
            onChange={this.handleChange}
            onPressEnter={this.handleSubmit}
          />
          { type === '注册' ? (
            <React.Fragment>
                <Input 
                  style={{ marginBottom: 20 }}
                  prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type='password'
                  name='passwordConfirm'
                  placeholder="再次输入你的密码"
                  ref={(node) => {this.passwordConfirm = node}}
                  onPressEnter={this.handleSubmit}
                />
                <Input
                  style={{ marginBottom: 20 }}
                  prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  name="tellphone"
                  placeholder="请输入手机"
                  value={this.state.tellphone}
                  onChange={this.handleChange}
                  onPressEnter={this.handleSubmit}
                />
            </React.Fragment>
           ) : ''
          }
        </div>
        <div className='authSubmit'>
          <Button style={{ width: "100%"}} type="primary" onClick={this.handleSubmit}>
            点击{type}
          </Button>
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    loginModalOpen: state.ui.loginModalOpen,
    registerModalOpen: state.ui.registerModalOpen
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(authActions, dispatch),
    ...bindActionCreators(uiActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthModal)