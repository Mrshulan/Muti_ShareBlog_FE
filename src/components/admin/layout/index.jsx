import React, { Component } from 'react'
import { Layout } from 'antd'

import SiderBar from '../siderbar/index'
import HeaderTop from '../header/index'

const { Sider, Header, Content, Footer } = Layout

class AdminLayout extends Component { 
  state = {
    collapsed: false
  }

  toggle = () => {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }))
  }

  render() {
    return (
      <div className="admin-container">
        <Layout>
          <Sider collapsible trigger={null} collapsed={this.state.collapsed}>
            <SiderBar />
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: '0 16px' }}>
              <HeaderTop collapsed={this.state.collapsed} onToggle={this.toggle} />
            </Header>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280
              }}>
              {this.props.children}
            </Content>
            <Footer style={{ textAlign: 'center' }}>React-Admin ©2019</Footer>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default AdminLayout