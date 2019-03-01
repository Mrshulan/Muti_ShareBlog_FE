import React, { Component } from 'react'

import { Layout, BackTop } from 'antd'
import Nav from '../../nav/nav'
import SliderRight from '../../slider/slider';


import './index.less'

const { Content, Footer, Sider } = Layout;

class Layouts extends Component {
  isShowSlider = true

  render() {
    let pathName = this.props.location.pathname;
    if (new RegExp("/(about|article|editor)",'g').test(pathName)) {
      this.isShowSlider = false;;
    } else {
      this.isShowSlider = true;
    }
    
    return (
      <div className="Layouts">
        <Nav pathname={pathName}/>
        <Layout className="layout">
          <Content>
            <Layout style={{ padding: '24px 0', background: '#fff' }}>
              <Content style={{ padding: '0 24px 0 0', minHeight: 280 }}>{this.props.children}</Content>
                {this.isShowSlider ? (
                  <Sider width={350} style={{ background: '#fff' }}>
                    <SliderRight />
                  </Sider>
                ): (
                  ''
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