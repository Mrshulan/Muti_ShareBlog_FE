import React, { Component } from 'react';
import { BrowserRouter as Router, Switch,   Route } from 'react-router-dom'
import routes from './routes/index.js'


class App extends Component {
  renderRoutes(routes, contextPath) {
    const children = []
    
    const renderRoute = (item, routeContextPath) => {
      let newContextPath = item.path ? `${routeContextPath}/${item.path}` : routeContextPath
      newContextPath = newContextPath.replace(/\/+/g, '/')

      if(item.component && item.childRoutes) {
        const childRoutes = this.renderRoutes(item.childRoutes, newContextPath)
        children.push(
          <Route
            key={newContextPath}
            render={props => <item.component {...props}>{childRoutes}</item.component>}
            path={newContextPath}
          />
        )
      } else if (item.component) {
        children.push(<Route key={newContextPath} component={item.component} path={newContextPath} exact={true} />)        
      } else if(item.childRoutes) {
        item.childRoutes.forEach(r => renderRoute(r, newContextPath))
      }
    }
    
    routes.forEach(item => renderRoute(item, contextPath))

    return <Switch>{children}</Switch>
  }

  render() {
    const children = this.renderRoutes(routes, '/')
    return (
      <Router basename="/blog">
        {children}
      </Router>
    );
  }
}

export default App;