import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import './css/text.css';

import Login from './components/form/login.form';
import UserProfile from "./components/userProfile.component"
import landingPage from "./components/landingPage.component"

function App() {
  return (

    <Router>
      <Route path="/" component={landingPage} />
      <Route path="/login" component={Login} />
      <Route path="/profile" component={UserProfile} />
    </Router>
  );
}

export default App;