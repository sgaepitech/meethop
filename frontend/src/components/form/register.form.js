import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
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
  Select,
  MenuItem,
  InputLabel,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@material-ui/core/';
import { render } from 'react-dom';

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
//   form: {
//     width: '75%',
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
//   input: {
//     "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
//       borderColor: "#45DBBE"
//     }
//   },
//   btnLp: {
//     background: '#F2917E',
//     borderRadius: 3,
//     border: 0,
//     color: 'white',
//     height: 48,
//     padding: '0 30px',
//     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//     "&:hover": {
//       background: '#45DBBE',
//     },
//   }
// }));

// const classes = useStyles();

export default class Register extends Component {
  constructor(){
    super();
    this.state={
      username: '',
      email: '',
      password: '',
      passwordconf: '',
      location: '',
      birthdate: '',
      // interests: '',
      open: false
    } 
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value
    });
  };

  handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value
    });
  };

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
    });
  };

  handlePasswordConfChange = (e) => {
    this.setState({
      passwordconf: e.target.value
    });
  };

  handleChangeLocation = e => {
    this.setState({
      location: e.target.value
    });
  };

  handleBirthdateChange = e => {
    this.setState({
      birthdate: e.target.value
    });
  };

  // handleChangeInterests = name => e => {
  //   this.interests({ [name]: e.target.checked });
  // };

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
    const newUser = { 
      username: this.state.username,
      email: this.state.email,
      password: this.state.passwordconf,
      location: this.state.location,
      birthdate: this.state.birthdate,
      // interests: this.state.interests
    };
    console.log('submit');
    console.log(newUser);
    fetch('http://localhost:5000/user/create', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then(res => res.json())
      .then(res => console.log(res));
  }

  render() {
  return (
    <Grid container justify = "center">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Grid container justify = "center">
          <Button size="large" variant="outlined" color="#45DBBE" onClick={this.handleClickOpen.bind(this)}>
            Register
          </Button>
        </Grid>
        <Dialog open={this.state.open} onClose={this.handleClose.bind(this)} aria-labelledby="form-dialog-title">
          <DialogContent>
            <div>
              <Typography component="h1" variant="h5">
                Register
              </Typography>
              <form onSubmit={this.handleSubmit} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={this.state.username}
                  onChange={this.handleUsernameChange.bind(this)}
                  autoFocus
                />
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
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="passwordconfirmation"
                  label="Password Confimation"
                  type="password"
                  id="passwordconfirmation"
                  value={this.state.passwordconf}
                  onChange={this.handlePasswordConfChange.bind(this)}
                  autoComplete="current-password-confirmation"
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="birthdate"
                  type="date"
                  id="birthdate"
                  value={this.state.birthdate}
                  onChange={this.handleBirthdateChange.bind(this)}
                  autoComplete="current-password-confirmation"
                />
                <InputLabel id="demo-simple-select-filled-label">Location</InputLabel>
                <Select
                  labelId="location"
                  id="location"
                  value={this.state.location}
                  onChange={this.handleChangeLocation.bind(this)}
                  required
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Paris">Paris</MenuItem>
                  <MenuItem value="Lyon">Lyon</MenuItem>
                  <MenuItem value="Bordeaux">Bordeaux</MenuItem>
                  <MenuItem value="Marseille">Marseille</MenuItem>
                  <MenuItem value="Lille">Lille</MenuItem>
                  <MenuItem value="Nice">Nice</MenuItem>
                  <MenuItem value="Nantes">Nantes</MenuItem>
                  <MenuItem value="Strasbourg">Strasbourg</MenuItem>
                </Select>
                {/* <FormGroup>
                  <Typography>Point of Interests</Typography>
                  <FormControlLabel
                    control={
                    <Checkbox 
                      onChange={this.handleChangeInterests.bind(this)} value="theater" 
                      />}
                    label="Theater"
                  />
                  <FormControlLabel
                    control={<Checkbox onChange={this.handleChangeInterests.bind(this)} value="museum" />}
                    label="Museum"
                  />
                  <FormControlLabel
                    control={<Checkbox onChange={this.handleChangeInterests.bind(this)}value="nautic" />}
                    label="Nautic"
                  />
                  <FormControlLabel
                    control={<Checkbox onChange={this.handleChangeInterests.bind(this)} value="museum" />}
                    label="Museum"
                  />
                  <FormControlLabel
                    control={<Checkbox onChange={this.handleChangeInterests.bind(this)} value="shopping" />}
                    label="Shopping"
                  />
                  <FormControlLabel
                    control={<Checkbox onChange={this.handleChangeInterests.bind(this)}value="board_games" />}
                    label="Board games"
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox onChange={this.handleChangeInterests.bind(this)}value="concert" />}
                    label="Concert"
                  />
                  <FormControlLabel
                    control={<Checkbox onChange={this.handleChangeInterests.bind(this)} value="sport" />}
                    label="Sport"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox onChange={this.handleChangeInterests.bind(this)} value="outdoor" />}
                      label="Outdoor"
                  />
                </FormGroup> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Register
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Already registered? Log in"}
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
    </Grid>
  );
}}