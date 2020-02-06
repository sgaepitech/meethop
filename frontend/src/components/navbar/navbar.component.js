import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Logo from '../../img/logo.png';
import { Link } from 'react-router-dom';
import Login from '../form/login.form';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar(props) {
    const { logged, username, imgAvatar } = props
    const classes = useStyles();

    if(props.logged == "isLogged") {
        return (
            <div className={classes.root}>
            <AppBar position="absolute"  style={{ background: 'transparent', boxShadow: 'none'}}>
                <Toolbar>
                    <Link to={"/"} className="nav-link">
                        <img src={Logo} alt="Logo" width="80" />
                    </Link>
                    <Typography variant="h6" color="primary" className={classes.title}>MeetHop</Typography>
                    <Link to={"/userprofile"} className="nav-link">
                        <Button color="primary" onClick={() => {console.log("User profile clicked")}}>
                            <Typography variant="button" className={classes.title}>{username}</Typography>
                            <Avatar className={classes.purple}>OP</Avatar>
                        </Button>
                    </Link>
                    <Link to={"/eventmanagement"} className="nav-link">
                        <Button variant="contained" color="primary" onClick={() => {console.log("Event management clicked")}}>Event management</Button>
                    </Link>
                    <Link to={"/logout"} className="nav-link">
                        <Button variant="contained" color="primary" onClick={() => {console.log("Logout clicked")}}>Logout</Button>
                    </Link>
                </Toolbar>
            </AppBar>
            </div>
        );
    } else {
        return (
            <div className={classes.root}>
            <AppBar position="absolute"  style={{ background: 'transparent', boxShadow: 'none'}}>
                <Toolbar>
                    <img src={Logo} alt="Logo" width="80" />
                    <Typography variant="h6" color="primary" className={classes.title}>MeetHop</Typography>
                    {/* <Button variant="contained" color="primary" onClick={() => {console.log("Logout clicked")}}>Login</Button> */}
                    <Login />
                </Toolbar>
            </AppBar>
            </div>
        );
    }
}