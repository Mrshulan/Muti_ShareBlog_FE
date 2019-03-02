import React, { Component } from 'react'
import { Modal, Input, Icon, message, Button } from 'antd';
import { connect } from 'react-redux'
// import { registerFailue, registerSuccess } from '../../store/actions/user'

class Register extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      email: '',
      name:  '',
      password: '',
      tellphone: '',
      introduce: '',
      type: 1
    }
	}
	
	register = ({ email, name, password, tellphone, introduce, type }) => {
		this.props.registerSuccess({
			email,
			name,
			password,
			tellphone,
			introduce,
			type,
		});
		this.props.handleCancel();
		message.success('注册成功, 请登录~', 1);
	}

  handleOk = () =>  {
		const reg = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$'); //正则表达式
		const re = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
		if (!this.state.email) {
			message.warn('邮箱不能为空！');
		} else if (!reg.test(this.state.email)) {
			message.warn('请输入格式正确的邮箱！');
		} else if (!this.state.name) {
			message.warn('用户名不能为空！');
		} else if (!this.state.password) {
			message.warn('密码不能为空！');
		} else if(!this.state.tellphone) {
			message.warn('手机号不能为空');
		} else if(!re.test(this.state.tellphone)) {
			message.warn('请输入正确的手机号!');
		} else {
			this.register(this.state);
		}
	}
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
  }
  
  render() {
    return (
      <Modal
        title='注册'
        style={{ top: '18%' }}
        visible={this.props.visible}
        onCancel={this.props.handleCancel}
        width={500}
        footer={null}
      >
        <div className="register-input">
          <Input 
            style={{ marginBottom: 20}}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            name="email"
            placeholder='请输入邮箱'
            value={this.state.email}
            onChange={this.handleChange}
          />
          <Input
						style={{ marginBottom: 20 }}
						prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
						name="name"
						placeholder="请输入用户名"
						value={this.state.name}
						onChange={this.handleChange}
					/>
					<Input
						style={{ marginBottom: 20 }}
						prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
						type="password"
						name="password"
						placeholder="请输入密码"
						value={this.state.password}
						onChange={this.handleChange}
					/>
					<Input
						style={{ marginBottom: 20 }}
						prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
						name="tellphone"
						placeholder="请输入手机（可为空）"
						value={this.state.tellphone}
						onChange={this.handleChange}
					/>
					<Input
						style={{ marginBottom: 40 }}
						prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
						name="introduce"
						placeholder="请输入个人介绍（可为空）"
						value={this.state.introduce}
						onChange={this.handleChange}
					/>
        </div>
        <div className="register-submit">
          <Button style={{ width: '100%'}} type="primary" onClick={this.handleOk}>
            注册
          </Button>
        </div>
      </Modal>
    )
  }
}

export default (Register)