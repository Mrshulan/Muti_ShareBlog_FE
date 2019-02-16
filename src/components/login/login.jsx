import React, { Component } from 'react'
import { Modal, Input, Icon, message, Button} from 'antd'

class Login extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleOk = () => {
    const reg = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$');

    if(!this.state.email) {
      message.warn('邮箱不能空！')
    } else if (!reg.test(this.state.email)) {
      message.warn('请输入正确的邮箱！')
    } else if (!this.state.password) {
      message.warn('密码不能空')
    } else {
      this.login(this.state)
    }
  }

  render() {
    return (
      <Modal 
        title='登录'
        style={{ top: '25%' }}
        visible={this.props.visible}
        onCancel={this.props.handleCancel}
        width={400}
        footer={null}
      >
        <div className='login-input'>
          <Input 
            style={{ marginBottom: 20 }}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            name='email'
            value={this.state.email}
            onChange={this.handleChange}
          />
          <Input 
            style={{ marginBottom: 20 }}
            prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
            type='password'
            name='password'
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>
        <div className='login-submit'>
          <Button style={{ width: "100%"}} type="primary" onClick={this.handleOk}>
            登录
          </Button>
        </div>
      </Modal>
    )
  }
}

export default Login