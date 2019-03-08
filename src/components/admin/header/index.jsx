import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect} from 'react-redux'
import { Avatar, Icon, Dropdown, Menu } from 'antd'
import { actions as authActions } from '../../../redux/modules/auth'
import './index.less'

class Header extends Component { 
  handleLogout = () => {
    this.props.logout()
  }

  renderDropDownMenu = () => {
    return (
      <Menu className='menu'>
        <Menu.Item>
          <span onClick={() => this.props.history.push('/')}>返回主页</span>
        </Menu.Item>
        <Menu.Item>
          <span onClick={this.handleLogout}>退出登录</span>
        </Menu.Item>
      </Menu>
    )
  }


  render () {
    const { collapsed, username, avatar} = this.props

    return (
      <div className="admin-header-container">       
        <Icon
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          className={'trigger'}
          onClick={this.props.onToggle}
        />
        <div className="header-right">
          <Dropdown overlay={this.renderDropDownMenu()}>
            <span>
              <Avatar src={'http://localhost:6001' + avatar} /> { username }
            </span>
          </Dropdown>
        </div>
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
    ...bindActionCreators(authActions, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))