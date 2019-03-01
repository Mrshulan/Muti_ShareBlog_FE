import React, { Component } from 'react'

import { Button, Icon, Dropdown, Menu } from 'antd'

import './index.less'

class Header extends Component {
  
  handleLogout = () => {
    console.log('退出成功')
    this.props.history.push('/login')
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
    const { collapsed } = this.props

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
              "avatar"
            </span>
          </Dropdown>
        </div>
      </div>
    )
  }
}

export default Header