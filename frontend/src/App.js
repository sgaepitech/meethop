import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';

import Login from './components/login.form.js';
import Register from './components/register.form.js';
import UserProfile from "./components/userProfile.component"
import CardMedia  from './components/card.js';
import ScrollableTabsButtonForce from './components/tabbar.js';

function App() {
  return (
    <Router>
      <Route path="/" component={ScrollableTabsButtonForce} />
      <Route path="/test" component={CardMedia} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/profile" component={UserProfile} />
    </Router>
  );
}

export default App;
