import React, { Component } from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Button, 
  CssBaseline, 
  TextField, 
  Grid, 
  Link, 
  Typography,
  Container,
  Dialog,
  DialogContent,
  Box,
  FormControlLabel,
  Checkbox
} from '@material-ui/core/';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        MeetHop
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// const useStyles = makeStyles(theme => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: "#45DBBE",
//   },
//   form: {
//     width: '75%',
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
//   outlinedRoot: {
//     '&:hover $notchedOutline': {
//       borderColor: 'red',
//     },
//     '&$focused $notchedOutline': {
//       borderColor: 'green',
//       borderWidth: 1,
//     },
//   },
//   notchedOutline: {},
//   focused: {},
// }));

export default class Login extends Component {
  constructor(){
    super();
    this.state={
      email: '',
      password: '',
      open: false
    }
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value
    });
  };

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
    });
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const User = { 
      email: this.state.email,
      password: this.state.password,
    };
    console.log('submit');
    console.log(User);
    fetch('http://localhost:5000/user/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(User),
    })
      .then(res => res.json())
      .then(res => console.log(res));
  }

  render(){
    // const { classes } = this.props;
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Button variant="outlined" color="#45DBBE" onClick={this.handleClickOpen.bind(this)}>
        Sign in
      </Button>
      <Dialog open={this.state.open} onClose={this.handleClose.bind(this)} aria-labelledby="form-dialog-title">
        <DialogContent>
          <div>
            <Avatar>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form onSubmit={this.handleSubmit} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={this.state.email}
                onChange={this.handleEmailChange.bind(this)}
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={this.state.password}
                onChange={this.handlePasswordChange.bind(this)}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}}