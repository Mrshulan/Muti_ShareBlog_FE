import React, { Component } from 'react';
import { Switch,  BrowserRouter as Router, Route } from 'react-router-dom'
import Layouts from './views/layout'
import routers from './router/index.js'


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Layouts>
            {routers.map((r, key) => <Route component={r.component} exact={!!r.exact} key={key} path={r.path}/>)}
          </Layouts>
        </Switch>
      </Router>
    );
  }
}

export default App;