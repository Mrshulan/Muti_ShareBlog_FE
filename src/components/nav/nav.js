import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Icon, Menu, Row, Col, Input, Button } from 'antd';

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
      keyword: '',
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

  handleChange = e => {
    this.setState({
      keyword: e.target.value
    })
  }

  handleSubmit = e => {
    const keyword = this.state.keyword
    if (keyword) {
      console.log("你将要搜索" + keyword)
      this.setState({
        keyword: ''
      })
    }
  }

  
  initMenu = pathName => {
    let key = '1'
    if(pathName === '/') {
      key = "1"
    } else if (pathName === '/hottest') {
      key = '2'
    } else if (pathName === '/categories') {
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
    this.setState({
      current: e.key
    })

    window.sessionStorage.userInfo = ''
  }

  handleAdmin = () => {
    window.location = "/admin"
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
            <Col style={{ float: 'left', marginRight: '20px'}}>
              <a href="http://mrshulan.com">
                <div className="logo ">
                  <img src={logo} alt="" />
                </div>
							</a>
            </Col>
            <Col style={{ float: 'left', padding:"0px 10px"}}>
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
                  <Link to="/hottest">
                    <Icon type="home" theme="outlined" /> 热门
                  </Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to="/categories">
                    <Icon type="home" theme="outlined" /> 分类
                  </Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Link to="/about">
                    <Icon type="home" theme="outlined" /> 关于
                  </Link>
                </Menu.Item>
              </Menu>
            </Col>
            <Col style={{ float: 'left'}}>
              <Icon type="search" className="searchIcon" onClick={this.handleSubmit}/>
              <Input 
                type="text"
                value={this.state.keyword}
                onChange={this.handleChange}
                onPressEnter={this.handleSubmit}
                placeholder="搜索文章"
                style={{width: 200}}
                className='searchIpt'
              />
            </Col>
            <Col style={{ textAlign: 'right', width: '330px', float: 'right' }}>
              {userInfo ? (
                <div>
                  <Button
                  ghost
                  type="primary"
                  style={{ marginRight: 20 }}
                  href='/editor'
                  >
                  发表文章
                  </Button>
                  <Menu
                    style={{ width: 210, lineHeight: '64px', display: 'inline-block' }}
                    mode="horizontal"
                  >
                    <SubMenu
                      title={
                        <span className="submunu-title-wrap">
                          <Icon type='user'/> { userInfo.name }
                        </span>
                      }
                    >
                      <MenuItemGroup>
                          <Menu.Item key="admin" onClick={this.handleAdmin}>个人中心</Menu.Item>
                          <Menu.Item key="logout" onClick={this.handleLogout}>退出</Menu.Item>
                      </MenuItemGroup>
                    </SubMenu>
                  </Menu>
                </div>
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