import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import './css/text.css';

import Register from './components/form/register.form';
import Login from './components/form/login.form';
import UserProfile from "./components/userProfile.component"
import CardMedia  from './components/card.js';
import ScrollableTabsButtonForce from './components/tabbar.js';
import landingpage from './components/landingPage.component'

function App() {
  return (
    <Router>
      <Route exact path="/" component={landingpage} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />


      <Route path="/logged" component={ScrollableTabsButtonForce} />
      <Switch>

      <Route path="/logged/test" component={CardMedia} />
      <Route path="/logged/profile" component={UserProfile} />
      </Switch>
    </Router>
  );
}

export default App;
