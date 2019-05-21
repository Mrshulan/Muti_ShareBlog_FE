import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from "react-redux"
import { actions as authActions } from '../../../../redux/modules/auth'
import { Input, Button, Icon, message} from 'antd'
import './index.less'
import axios from '../../../../utils/axios'


class InfoManage extends Component{
  state = {
    signature: '',
    email: '',
    weibo: '',
    tellphone: 18473871766
  }

  handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		})
  }

  handleSubmit = () => {
    const { email, signature, weibo } = this.state
    if( email && signature && weibo){
      if(/^\w+@\w{2,10}\.\w{2,6}(\.\w{2,6})?$/.test(email)) {
        if(/^[\w | \u4e00-\u9fa5]{1,20}$/) {
          if(/^http(s)?:\/\/(www\.)?weibo\.com/.test(weibo)) {
            axios.post('/user/userinfo', { email, signature, weibo }).then(res => {
              message.success(res.message)
              // 此时action就并没有异步行为了
              this.props.updateInfo({ email, signature, weibo })
            })
          } else {
            message.error('填写正确的微博地址')
            this.setState({weibo: ''})
          }
        } else {
          message.error('个性签名不能超过20个字')
          this.setState({signature: ''})
        }
      } else {
        message.error('请填写正确的邮箱')
        this.setState({email: ''})
      }
    } else {
      message.error('请务必填写完整')
    }
  }

  render() {
    const { info, tellphone }  = this.props
    return (
      <div className="profile">
        <Input 
          addonBefore="手机号"
          style={{ marginBottom: 20 }}
          prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder={tellphone || "18473871766"}  
          name='tellphone'
          disabled={true}
        />
        <Input 
          addonBefore="个性签名"
          style={{ marginBottom: 20 }}
          prefix={<Icon type='flag' style={{ color: 'rgba(0,0,0,.25)' }} />}
          name='signature'
          placeholder={info.signature || "这个家伙很懒,什么也没有留下~"}
          value={this.state.signature}
          onChange={this.handleChange}
        />
        <Input 
          addonBefore="邮箱"
          style={{ marginBottom: 20 }}
          prefix={<Icon type='mail' style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder={info.email || "adengminjie@163.com"}
          name='email'
          value={this.state.email}
          onChange={this.handleChange}
        />
        <Input 
          addonBefore="微博"
          style={{ marginBottom: 20 }}
          prefix={<Icon type='weibo' style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder={info.weibo || 'https://weibo.com/575555860'}
          name='weibo'
          value={this.state.weibo}
          onChange={this.handleChange}
        />
        <Button style={{ width: "100%"}} type="primary" onClick={this.handleSubmit}>
          确认修改
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  info: state.auth.info,
  tellphone: state.auth.tellphone
})
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(authActions, dispatch)    
})

export default connect(mapStateToProps, mapDispatchToProps)(InfoManage)