import React, { Component } from 'react'

import { Layout, BackTop } from 'antd'
import Nav from '../components/nav/nav'
import SliderRight from '../components/slider/slider';


import './index.less'

const { Content, Footer, Sider } = Layout;

class Layouts extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      isShowSilder: false,
    }
  }

  render() {
    let isShowSlider = false
    let pathName = this.props.location.pathname;
    if (pathName !== '/articleDetail' && pathName !== '/about') {
			isShowSlider = true;
    }
    
    return (
      <div className="Layouts">
        <Nav pathname={pathName}/>
        <Layout className="layout">
          <Content>
            <Layout style={{ padding: '24px 0', background: '#fff' }}>
              <Content style={{ padding: '0 24px 0 0', minHeight: 280 }}>{this.props.children}</Content>
                {!isShowSlider ? (
                  ''
                ) : (
                  <Sider width={350} style={{ background: '#fff' }}>
                    <SliderRight />
                  </Sider>
                )}
            </Layout>
          </Content>
          <Footer style={{ textAlign: 'center', background: '#fff' }}>
            树懒先生
          </Footer>
        </Layout>
      </div>
    )
  }
}

export default Layouts