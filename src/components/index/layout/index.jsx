import React from 'react'
import { Layout, BackTop } from 'antd'
import { connect } from 'react-redux'
import Nav from '../nav/'
import SliderRight from '../slider'
import './index.less'
const { Content, Footer, Sider } = Layout

const mapStateToProps = (state) => ({
  userInfo: state.auth
})

const Layouts = (props) => {
  let isShowSlider = true
  let pathName = props.location.pathname

  if (new RegExp("/(about|article|editor)",'g').test(pathName)) {
    isShowSlider = false
  } else {
    isShowSlider = true
  }

  return (
    <div className="Layouts">
      <Nav pathname={pathName}/>
      <Layout className="layout">
        <Content>
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Content style={{ padding: '0 24px 0 0', minHeight: 280 }}>{props.children}</Content>
            {isShowSlider ? (
              <Sider width={350} style={{ background: '#fff' }}>
                <SliderRight data={props.userInfo}/>
              </Sider>
            ): (
              ''
            )}
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center', background: '#fff' }}>
            © 2018-2019&nbsp;<a href='https://mrshulan.com' target='_blank' rel="noopener noreferrer">@树懒先生sir</a>&nbsp;湘ICP备18021596号-1
        </Footer>
        <BackTop />
      </Layout>
    </div>
  )
}

export default connect(mapStateToProps)(Layouts)