import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {
  Avatar,
  Container,
  Grid,
} from '@material-ui/core/';

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

const ProfileHeader = () => {
  let classes = useStyles();
  return (
      <Grid container className={classes.header} direction="column" justify="center" alignItems="center">
        <Grid item xs={12}>
          <Avatar className={classes.avatar} alt={SampleUser.username} src={require("../img/avatar_sample.png")} />
        </Grid>
      </Grid>
  )
}

const ProfileInformations = () => {
  let classes = useStyles();
  return (
      <Grid container spacing={3} justify="center">
        <Grid item xs={6}>
          <MeethopCard type="userCard" title="User Informations" user={SampleUser}/>
        </Grid>
        <Grid item xs={6}>
          <MeethopCard type="userCard" title="User Description" description={SampleUser.description}/>
        </Grid>
      </Grid>
  )
}

const UserInterests = () => {
  let classes = useStyles();
  return (
      <Grid container className={classes.gridContain}>
        <Grid item xs={12}>
          <MeethopCard type="userCard" title="User Interests" interests={SampleUser.interests}/>
        </Grid>
      </Grid>
  )
}

export default class UserProfile extends Component {

  render() {

    return (
      <Container maxWidth="md">
        <ProfileHeader />
        <ProfileInformations />
        <UserInterests />
      </Container>
    )
  }
}
