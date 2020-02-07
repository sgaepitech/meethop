import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import './css/text.css';
import Landing from './components/landing/landing.component';
import Main from './components/main/main.component';
import EventManager from './components/event/dashboard.event.component';
import NavBar from './components/navbar/navbar.component';

class App extends Component {
  render() {
    return (
      <Router>
        <NavBar logged="isLogged" />
        <Switch>
            <Route exact path='/' component={Landing} />
            <Route path='/main' component={Main} />
            <Route path='/eventmanager' component={EventManager} />
        </Switch>
      </Router>
    );
  }
}

export default App;
