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
import UserProfile from './components/userProfile.component';

class App extends Component {
  constructor() {
    super();
    if(localStorage.getItem('accessToken') !== null && localStorage.getItem('accessToken') !== 'undefined') {
      this.state = {
        loggedIn: true,
        user: ''
      }
    } else {
      this.state = {
        loggedIn: false,
        user: ''
      }
    }
  };

  getUser = () => {
    fetch("http://localhost:5000/user/read", {
      method: "GET",
      headers: { "x-access-token": localStorage.getItem('accessToken')}
    })
      .then((data) => data.json())
      .then((res)=> this.setState({
        user: res
        })
      )
      // .then(() => console.log(this.state.user))
  };

  login = () => {
    if(localStorage.getItem('accessToken') !== 'undefined') {
      this.setState({
        loggedIn: true
      });
      this.getUser();
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
        <NavBar status={this.state.loggedIn} logout={this.logout} login={this.login} user={this.state.user} />
        <Switch>
          <Route exact path='/' component={Landing} />
          <PrivateRoute path='/main' component={Main} isAuthenticated={this.state.loggedIn} />
          <PrivateRoute path='/event' component={EventManager} isAuthenticated={this.state.loggedIn} />
          <PrivateRoute path='/user' component={UserProfile} isAuthenticated={this.state.loggedIn} />
        </Switch>
      </div>
    );
  }
}

export default App;
