import React, { Component } from 'react';
import { Switch,  BrowserRouter as Router, Route } from 'react-router-dom'
import Nav from './components/nav/nav'


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Nav}/>
        </Switch>
      </Router>
    );
  }
}

export default App;