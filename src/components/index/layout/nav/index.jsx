import React, { Component, Fragment} from 'react'
import { Link,withRouter } from 'react-router-dom'
import { Layout, Icon, Menu, Row, Col, Input, Button, Avatar ,message} from 'antd';

import AuthModal from '../../modals/authModal'
import ArticlesModal from '../../modals/articlesModal'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as authActions} from '../../../../redux/modules/auth'
import { actions as uiActions} from '../../../../redux/modules/ui'

import './index.less'
import logo from '@/assets/logo.jpg'

const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const isPro = process.env.NODE_ENV === 'production'
class Nav extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      menuCurrent: '',
      keyword: '',
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

  handleEditStatus = ()=> {
    // 如果路由不是 /editor 就切换状态 (due to props 传递无奈...)
    if(this.props.pathname !== '/editor') {
      this.props.editStatus()  
    }
  }

  handleSearch = e => {
    const keyword = this.state.keyword
    if (keyword) {
      this.props.openArticlesModal()
    } else {
      message.error('输入你想要查询的文章')
    }
  }
  
  initMenu = pathName => {
    let key = '1'
    if(pathName === '/') {
      key = "1"
    } else if (pathName === '/hot') {
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

  toAdmin = () => {
    this.props.history.push('/user')
  }

  render () {
    const { username, avatar, isEdit } = this.props
    const { keyword } = this.state

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
            paddingLeft: 'calc(100vw - 100%)',
            backgroundColor: 'white',
            borderBottom: '1px solid #eee'
          }}
        >
          <Row className="container">
            <Col style={{ float: 'left', marginRight: '20px'}}> 
              <a href="http://mrshulan.com" target="_blank" without="true" rel="noopener noreferrer">
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
                  <Link to="/hot">
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
              <Icon type="search" className="searchIcon" onClick={this.handleSearch}/>
              <Input 
                type="text"
                value={this.state.keyword}
                onChange={this.handleChange}
                onPressEnter={this.handleSearch}
                placeholder="搜索更新啦"
                style={{width: 200}}
                className='searchIpt'
              />
            </Col>
            <Col style={{ textAlign: 'right', float: 'right' }}>
              {username ? (
                <Fragment>
                  <Button
                  ghost
                  type="primary"
                  style={{ marginRight: 20 }}
                  >
                  <Link to="/editor" onClick={this.handleEditStatus}>
                    {isEdit ? "编辑下方分享哦" : '发表文章'}
                  </Link>
                  </Button>
                  <Menu
                    style={{ lineHeight: '64px', display: 'inline-block' }}
                    mode="horizontal"
                  >
                    <SubMenu
                      title={
                        <span className="submunu-title-wrap">
                          <Avatar src={(isPro ? 'http://mrshulan.xin' : 'http://127.0.0.1:6001') + avatar} /> { username }
                        </span>
                      }
                    >
                      <MenuItemGroup>
                          <Menu.Item key="admin" onClick={this.toAdmin}>个人中心</Menu.Item>
                          <Menu.Item key="logout" onClick={this.props.logout}>退出</Menu.Item>
                      </MenuItemGroup>
                    </SubMenu>
                  </Menu>
                </Fragment>
              ) : (<Fragment>
                <Button
                  type='primary'
                  icon='login'
                  style={{ marginRight: '15px'}}
                  onClick={() => this.props.openAuthModal('login')}
                >
                  登录
                </Button>
                <Button
                  type="danger"
                  icon="logout"
                  style={{ marginRight: '15px'}}
                  onClick={() => this.props.openAuthModal('register')}
                >
                  注册
                </Button>
              </Fragment>)}
            </Col>
          </Row>
        </Header>        
        <AuthModal />
        <ArticlesModal keyword={keyword}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  username: state.auth.username,
  avatar: state.auth.avatar,
  isEdit: state.ui.isEdit
})

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(uiActions, dispatch),
    ...bindActionCreators(authActions, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav))