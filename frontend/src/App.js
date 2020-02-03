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

function App() {
  return (

    <Router>
      
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/profile" component={UserProfile} />
    </Router>
  );
}

export default App;