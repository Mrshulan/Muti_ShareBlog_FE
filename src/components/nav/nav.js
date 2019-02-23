import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Icon, Menu, Row, Col, Button } from 'antd';

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
      current: null,
      menuCurrent: '',
      visible: false,
      login: false,
      register: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.initMenu(nextProps.pathname)
  }

  handleMenu = e => {
    this.setState({
      menuCurrent: e.key
    })
  }

  initMenu = pathName => {
    let key = '1'
    if(pathName === '/') {
      key = "1"
    } else if (pathName === '/hot') {
      key = '2'
    } else if (pathName === '/timeLine') {
      key = '3'
    } else if (pathName === '/about') {
      key = '4'
    } else {
      key = '1'
    }

    this.setState({
      menuCurrent: key
    })
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

  handleLogout = e => {
    this.setstate({
      current: e.key
    })

    window.sessionStorage.userInfo = ''
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
            backgroundColor: 'white',
            borderBottom: '1px solid #eee'
          }}
        >
          <Row className="container">
            <Col style={{ width: '120px', float: 'left' }}>
              <a href="http://mrshulan.com">
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
                selectedKeys={[this.state.menuCurrent || '1']}
                style={{ lineHeight: '64px', borderBottom: 'none'}}
              >
                <Menu.Item key="1">
                  <Link to="/">
                    <Icon type="home" theme="outlined" /> 首页
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/hot">
                    <Icon type="home" theme="outlined" /> 热门
                  </Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to="/timeLine">
                    <Icon type="home" theme="outlined" /> 时间轴
                  </Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Link to="/about">
                    <Icon type="home" theme="outlined" /> 关于
                  </Link>
                </Menu.Item>
              </Menu>
            </Col>
            <Col style={{ textAlign: 'right', width: '300px', float: 'left' }}>
              {userInfo ? (
                <Menu
                  onClick={this.handleLogout}
                  style={{ width: 220, lineHeight: '64px', display: 'inline-block' }}
                  selectedKeys={[this.state.current]}
									mode="horizontal"
                >
                  <SubMenu
                    title={
                      <span className="submunu-title-wrap">
                        <Icon type='user'/> { "username" }
                      </span>
                    }
                  >
                    <MenuItemGroup>
												<Menu.Item key="logout">退出</Menu.Item>
										</MenuItemGroup>
                  </SubMenu>
                </Menu>
              ) : (<div>
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
              </div>)}
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