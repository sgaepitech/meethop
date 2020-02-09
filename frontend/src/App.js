import React, { Component } from 'react';
import {
  BrowserRouter as Router,
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

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem !== null
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
)

class App extends Component {

  render() {
    if(localStorage.getItem('accessToken') !== null) {
      return (
        <Router>
          <NavBar logged="isLoggd" />
          <Switch>
            <Route exact path='/' component={Landing} />
            <PrivateRoute path='/main' component={Main} />
            <PrivateRoute path='/eventmanager' component={EventManager} />
          </Switch>
        </Router>
      );
    } else {
      return (
        <Router>
          <NavBar/>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route path='/main' component={Main} />
            {/* <Route path='/eventmanager' component={EventManager} /> */}
          </Switch>
        </Router>
      );
    }
  }
}

export default App;
