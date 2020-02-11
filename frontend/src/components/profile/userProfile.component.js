import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {
  Avatar,
  Container, CircularProgress,
  Grid,
} from '@material-ui/core/';

import axios from 'axios';

import MeethopCard from './meethopCard.component';

const SampleUser = {
  username: 'Toto',
  email: 'super@toto.com',
  password: 'secret',
  birthdate: '12.25.0',
  description: 'Lorem ipsum sin doloret amet blablabla hope hope houpla maqueuedonald mècouillesmiquè',
  localisation: 'Nazareth',
  interests: ["concert", "sport", "plein air", "cinéma", "théatre", "expo/musée", "nautique", "shopping"],
  warnings: 0,
  isActive: true,
}

const useStyles = makeStyles(theme => ({
  components: {
    marginTop: '50px',
  },
  header: {
    width: "100%",
    minHeight: "350px",
    background: "linear-gradient(#e66465, #9198e5);",
    margin: "30px 0",
  },
  loader: {
    width: "100%",
    minHeight: "400px",
  },
  gridContain: {
    margin: "30px 0",
  },
  avatar: {
    width: "128px",
    height: "128px",
  },
  root: {
    flexGrow: 1,
  },
}));

const CustomLoader = () => {
  let classes = useStyles();
  return (
    <Grid container className={classes.loader} direction="column" justify="center" alignItems="center">
      <Grid item xs={12}>
        <CircularProgress color="secondary" />
      </Grid>
    </Grid>
  )
}

const ProfileHeader = (props) => {
  let classes = useStyles();
  let user = props.user;
  return (
    <Grid container className={classes.header} direction="column" justify="center" alignItems="center">
      <Grid item xs={12}>
        <Avatar className={classes.avatar} alt={user.username} src={require("../img/avatar_sample.png")} />
      </Grid>
    </Grid>
  )
}

const ProfileInformations = (props) => {
  let user = props.user;
  return (
    <Grid container spacing={3} justify="center">
      <Grid item xs={6}>
        <MeethopCard type="userCard" title="User Informations" user={user} />
      </Grid>
      <Grid item xs={6}>
        <MeethopCard type="userCard" title="User Description" description={user.description} />
      </Grid>
    </Grid>
  )
}

const UserInterests = (props) => {
  let classes = useStyles();
  let hobbies = props.user;
  return (
    <Grid container className={classes.gridContain}>
      <Grid item xs={12}>
        <MeethopCard type="userCard" title="User Interests" interests={hobbies} />
      </Grid>
    </Grid>
  )
}

export default class UserProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        interests: [],
      },
      loading: true,
    };
  }

  getUser() {
    axios.get('http://localhost:5000/user/read/', {
      headers: { 'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTM5OTg1NTk2ZWIyZTFiZDZiOWRiMjIiLCJpYXQiOjE1ODA5MjQzODl9.KpjyOP9WqAIkJcjkvLQprqzcQvtOqRUM124T_QKoFwk' }
    })

      .then(response => {
        this.setState({ user: response.data });
        this.setState({ loading: false });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  componentDidMount() {
    this.getUser();
  }

  render() {

    if (this.state.loading)
      return <CustomLoader />
    else {
      return (
        <Container maxWidth="md">
          <ProfileHeader user={this.state.user} />
          <ProfileInformations user={this.state.user} />
          <UserInterests user={this.state.user.interests} />
        </Container>
      )
    }
  }
}
