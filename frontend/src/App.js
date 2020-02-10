import React, { Component } from 'react';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './App.css';
import './css/text.css';
import Landing from './components/landing/landing.component';
import Main from './components/main/main.component';
import EventManager from './components/event/dashboard.event.component';
import NavBar from './components/navbar/navbar.component';
import PrivateRoute from './components/router/private.component';

class App extends Component {
  constructor() {
    super();
    if(localStorage.getItem('accessToken') !== null && localStorage.getItem('accessToken') !== 'undefined') {
      this.state = {
        loggedIn: true
      }
    } else {
      this.state = {
        loggedIn: false
      }
    }
  };

  login = () => {
    if(localStorage.getItem('accessToken') !== 'undefined') {
      this.setState({
        loggedIn: true
      });
    }
  };

  logout = () => {
    localStorage.removeItem('accessToken');
    this.setState({
      loggedIn: false
    });
  };

  render() {
    return (
      <div style={{height: "100%"}}>
        <NavBar status={this.state.loggedIn} logout={this.logout} login={this.login} />
        <Switch>
          <Route exact path='/' component={Landing} />
          <PrivateRoute path='/main' component={Main} isAuthenticated={this.state.loggedIn} />
          <PrivateRoute path='/event' component={EventManager} isAuthenticated={this.state.loggedIn} />
        </Switch>
      </div>
    );
  }
}

export default App;
