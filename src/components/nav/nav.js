import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Icon, Menu, Row, Col, Button, Drawer, Divider } from 'antd';

import Login from '../login/login'
import Register from '../register/register'

import './index.less'
import logo from '../../assets/logo.jpg';

const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class Nav extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      nav: '首页',
      navTitle: '首页',
      login: false,
      register: false,
    }
  }

  showLoginModal = () => {
    this.setState({
      login: true
    })
  }
  handleLoginCancel = () => {
    this.setState({
      login: false
    })
  }
  showRegisterModal = () => {
    this.setState({
      register: true
    })
  }
  handleRegisterCancel = () => {
    this.setState({
      register: false
    })
  }

  render () {
    let userInfo = ''
    
    if(window.sessionStorage.userInfo) {
      userInfo = JSON.parse(window.sessionStorage.userInfo)
    }

    return (
      <div className="left">
        <Header 
          className="header"
          style={{
            position: 'fixed',
            zIndex: 1,
            top: 0,
            width: '100%',
            minWidth: '1200px',
            height: '66px',
            float: 'left',
            backgroundColor: 'whitle',
            borderBottom: '1px solid #eee'
          }}
        >
          <Row className="container">
            <Col style={{ width: '120px', float: 'left' }}>
              <a href="mrshulan.com">
                <div className="logo ">
                  <img src={logo} alt="" />
                </div>
							</a>
            </Col>
            <Col style={{width: '780px', float: 'left'}}>
              <Menu
                theme="light"
                mode='horizontal'
                defaultSelectedKeys={['1']}
                onClick={this.handleMenu}
                selectedKeys={[this.state.menuCurrent]}
                style={{ lineHeight: '64px', borderBottom: 'none'}}
              >
                <Menu.Item key="1">
                  <Link to="/home">
                    <Icon type="home" theme="outlined" /> 首页
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/home">
                    <Icon type="home" theme="outlined" /> 首页
                  </Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to="/home">
                    <Icon type="home" theme="outlined" /> 首页
                  </Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Link to="/home">
                    <Icon type="home" theme="outlined" /> 首页
                  </Link>
                </Menu.Item>
              </Menu>
            </Col>
            <Col style={{ textAlign: 'right', width: '300px', float: 'left' }}>
              <div>
                <Button
                  type='primary'
                  icon='login'
                  style={{ marginRight: '15px'}}
                  onClick={this.showLoginModal}
                >
                  登录
                </Button>
                <Button
                  type="danger"
                  icon="logout"
                  style={{ marginRight: '15px'}}
                  onClick={this.showRegisterModal}
                >
                  注册
                </Button>
              </div>
            </Col>
          </Row>
        </Header>
        
        <Login visible={this.state.login} handleCancel={this.handleLoginCancel}/>
        <Register visible={this.state.register} handleCancel={this.handleRegisterCancel} />
      </div>
    )
  }
}

export default Nav