import React, { Component } from 'react'
import { NavLink, } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import routes from  '../../../routes/admin'
import { connect } from 'react-redux'

const SubMenu = Menu.SubMenu

class Siderbar extends Component {
  state = {
    openKeys: [],
    selectedKeys: []
  }

  componentDidMount() {
    const pathname = window.location.pathname
    let index = pathname.lastIndexOf('/')
    const openKeys = [pathname.slice(0, index)]
    this.setState({ selectedKeys: [pathname], openKeys })
  }

  renderMenu = data => {
    const renderRoute = (item, routeContextPath) => {
      if(this.props.role === '1' && item.path === 'users') return
      if(this.props.role === '1' && item.path === 'userArticles') return
      if(this.props.role === '1' && item.path === 'categories') return
      let newContextPath = item.path ? `${routeContextPath}/${item.path}` : routeContextPath
      if(item.childRoutes) {
        return (
          <SubMenu
            title={
              <span>
                {item.icon && <Icon type={item.icon} />}
                <span>{item.name}</span>
              </span>
            }
            key={newContextPath}
          >
           {item.childRoutes.map(r => renderRoute(r, newContextPath))}
          </SubMenu>
        )
      } else {
        return (
          item.name && (
            <Menu.Item key={newContextPath}>
              <NavLink to={newContextPath}>
                {item.icon && <Icon type={item.icon} />}
                <span>{item.name}</span>
              </NavLink>
            </Menu.Item>
          )
        )
      }
    }
    return data.childRoutes.map(d => renderRoute(d, '/user'))
  }

  onOpenChange = openKeys => {
    this.setState({ openKeys })
  }

  render() {
    const { openKeys, selectedKeys } = this.state

    return (
      <div className="sibar-container" style={{ height: '100vh' }}>
        <Menu
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          onOpenChange={this.onOpenChange}
          onClick={({ key }) => this.setState({ selectedKeys: [key] })}
          theme="dark"
          mode="inline"
        >
          {this.renderMenu(routes)}
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    role: state.auth.role
})

export default connect(mapStateToProps)(Siderbar)