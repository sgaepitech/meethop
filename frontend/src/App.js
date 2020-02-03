import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';

import UserDashboard from "./components/userDashboard.component"

function App() {
  return (
    <Router>
      

      <Route path="/dashboard" component={UserDashboard} />
    </Router>
  );
}

export default App;
