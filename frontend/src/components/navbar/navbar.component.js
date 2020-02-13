import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Logo from '../../img/logo.png';
import { Link } from 'react-router-dom';
import Login from '../login/login.component';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar(props) {
    const { status, username, imgAvatar, logout, login, user } = props
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    if(props.status === true) {
        return (
            <div className={classes.root}>
            <AppBar position="static"  style={{ background: 'transparent', boxShadow: 'none'}}>
                <Toolbar>
                    <Link to={"/main"} className="nav-link">
                        <img src={Logo} alt="Logo" width="80" />
                    </Link>
                    <Typography variant="h6" color="primary" className={classes.title}>MeetHop</Typography>
                    <Link to={"/user"} className="nav-link">
                        <Button color="primary">
                            <Typography variant="button" className={classes.title}>{props.user.email}</Typography>
                            <Avatar className={classes.purple}>OP</Avatar>
                        </Button>
                    </Link>
                    <Link to={"/event"} className="nav-link">
                        <Button variant="contained" color="primary">Event management</Button>
                    </Link>
                    <Button variant="contained" color="primary" onClick={props.logout}>Logout</Button>
                </Toolbar>
            </AppBar>
            </div>
        );
    } else {
        return (
            <div className={classes.root}>
            <AppBar position="static"  style={{ background: 'transparent', boxShadow: 'none'}}>
                <Toolbar>
                    <img src={Logo} alt="Logo" width="80" />
                    <Typography variant="h6" color="primary" className={classes.title}>MeetHop</Typography>
                    <Button variant="contained" color="primary" onClick={handleOpen}>Login</Button>
                    <Login open={open} onClose={handleClose} login={props.login} />
                </Toolbar>
            </AppBar>
            </div>
        );
    }
}
