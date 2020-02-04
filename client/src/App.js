

import React from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import { ThemeProvider, createMuiTheme, fade, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MiniDrawer from './components/NavBar.js';
import RegisterLogin from './components/jycroive';
import SignInScreen  from './components/jycroive';
import RegistrationScreen from './components/jycroive';

const baseTheme = createMuiTheme();


const App = () => {
  return (
    <Router>
    <MiniDrawer />
    <Route path="/register" component={RegisterLogin} />
    </Router>
  );
};
export default App
