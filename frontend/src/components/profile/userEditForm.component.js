import React, { Component } from 'react';
import {
  Button,
  TextField,
  Select,
  MenuItem,
} from '@material-ui/core/';

export default class UserEditForm extends Component {
  constructor(props) {
    //console.log(props);
    super(props);
    this.state = {
      username: props.user.username,
      email: props.user.email,
      location: props.user.location,
      birthdate: props.user.birthdate,
      description: props.user.description,
      interests: props.user.interests,
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

  handleDescriptionChange = (e) => {
    this.setState({
      description: e.target.value
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

  handleSubmit = (e) => {
    e.preventDefault();
    const editedUser = {
      username: this.state.username,
      email: this.state.email,
      location: this.state.location,
      birthdate: this.state.birthdate,
      description: this.state.description,
    };

    //console.log("test q", editedUser);

    fetch('http://localhost:5000/user/update', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'x-access-token':  localStorage.getItem('accessToken')
      },
      body: JSON.stringify(editedUser),
    })
      .then(res => res.json())/* 
      .then(res => console.log(res)); */
  }

  render() {
    if (this.props.type == "User Informations") {
      return (

        <div>
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
              disabled={this.props.edition ? false : true}
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
              disabled={this.props.edition ? false : true}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="birthdate"
              label="Birthdate"
              name="birthdate"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={this.state.birthdate}
              onChange={this.handleBirthdateChange.bind(this)}
              autoComplete="birthdate"
              disabled={this.props.edition ? false : true}
            />
            <Select
              labelId="location"
              id="location"
              fullWidth
              disabled={this.props.edition ? false : true}
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


            <Button
              disabled={this.props.edition ? false : true}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="saving"
            >
              Save
              </Button>


          </form>
        </div>
      )
    };
    if (this.props.type == "User Description") {
      return (

        <div>
          <form onSubmit={this.handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              id="description"
              label="Description"
              name="description"
              autoComplete="description"
              value={this.state.description}
              onChange={this.handleDescriptionChange.bind(this)}
              autoFocus
              disabled={this.props.edition ? false : true}
            />

            <Button
              disabled={this.props.edition ? false : true}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="saving"
            >
              Save
              </Button>


          </form>
        </div>
      )
    };
  }
}