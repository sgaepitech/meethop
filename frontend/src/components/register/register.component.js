import React, { Component } from 'react';
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
      interests: [],
      value: '',
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

  handleChangeInterests = e => {
    if(e.target.checked == true) {
      this.setState({
        value: e.target.value
      });
      this.setState( state => {
        const interests = state.interests.concat(state.value);
        return {
          interests,
        };
      });

    } else {
      this.setState({
        value: e.target.value
      });
      this.setState( state => {
        const interests = state.interests.filter(item => item !== state.value );
        return {
          interests,
        };
      });
    }
  };
  
  handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { 
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.passwordconf,
      location: this.state.location,
      birthdate: this.state.birthdate,
      interests: this.state.interests
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
    <Dialog open={this.props.open} onClose={this.props.onClose} aria-labelledby="form-dialog-title">
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
            <FormGroup row={true}>
              <Typography>Point of Interests</Typography>
              <FormControlLabel
                control={
                <Checkbox 
                  onChange={this.handleChangeInterests.bind(this)} value="theater" 
                  />}
                label="Theater"
              />
              <FormControlLabel
                control={<Checkbox onChange={this.handleChangeInterests} value="museum" />}
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
            </FormGroup>
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
  );
}}