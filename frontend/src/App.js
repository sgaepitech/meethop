import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import './css/text.css';
import UserProfile from "./components/userProfile.component"
import CardMedia  from './components/card.js';
import landingpage from './components/landing/landing.component';
import NavBar from './components/navbar/navbar.component';

class App extends Component {
  render() {
    return (
      <Router>
            <NavBar logged="" />
            <Switch>
                <Route exact path='/' component={landingpage} />
                <Route path='/userprofile' component={UserProfile} />
                <Route path='/eventmanagement' component={CardMedia} />
            </Switch>
      </Router>
    );
  }
}

export default App;
