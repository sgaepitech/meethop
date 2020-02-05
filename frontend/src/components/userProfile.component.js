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
<<<<<<< HEAD
  return (
      <Grid container className={classes.header} direction="column" justify="center" alignItems="center">
        <Grid item xs={12}>
          <Avatar className={classes.avatar} alt={SampleUser.username} src={require("../img/avatar_sample.png")} />
=======
  return(
  <div className={classes.root}>
      <Paper className={classes.paper}>
      <Avatar src={require("../img/avatar_sample.png")} className={classes.large} />
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
            <AssistantIcon className={classes.customIconSize}/>
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  My personal description
                </Typography>
                <Typography variant="body2" gutterBottom>
                <Avatar src={require("../img/avatar_sample.png")} className={classes.large} />
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  I'm living in {SampleUser.localisation}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  I was born the {SampleUser.birthdate}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  <Button variant="contained" color="primary">
                      Edit description
                  </Button>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
>>>>>>> 88dc9e7b940d72ac35f5a9151cf349ab03570a22
        </Grid>
      </Grid>
  )
}

const ProfileInformations = () => {
  let classes = useStyles();
<<<<<<< HEAD
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
=======
  return(
  <div className={classes.root}>

      <Paper className={classes.paper}>
        <Grid container spacing={2}>
        <Avatar src={require("../img/avatar_sample.png")} className={classes.large} />

          <Grid item>
            <ButtonBase className={classes.image}>
            <AssistantIcon className={classes.customIconSize}/>
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  My personal description
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {SampleUser.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  I'm living in {SampleUser.localisation}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  I was born the {SampleUser.birthdate}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  <Button variant="contained" color="primary">
                      Edit description
                  </Button>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )}

const ChipsArray = () => {
    const classes = useStyles();
    var myInterests = SampleUser.interests.map((obj, i) => {
      var rObj = {};
      rObj.key = i;
      rObj.label = obj;
      return rObj;
    });

    const [chipData, setChipData] = React.useState(myInterests);

    const handleDelete = chipToDelete => () => {
      setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key));
    };

    return (
      <div>
        {chipData.map(data => {
          return (
            <Chip
              variant="outlined"
              color="primary"
              key={data.key}
              label={data.label}
              onDelete={data.label === 'React' ? undefined : handleDelete(data)}//if label has a specific name, no deletion option
              className={classes.chip}
            />
          );
        })}
      </div>
    );
  }

const UserInterests = () => {
  let classes = useStyles();
  return(
  <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
          <ButtonBase className={classes.image}>
            <LocalActivityIcon className={classes.customIconSize}/>
          </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  My personal interests
                </Typography>
                <ChipsArray/>
              </Grid>
            </Grid>
          </Grid>
>>>>>>> 88dc9e7b940d72ac35f5a9151cf349ab03570a22
        </Grid>
      </Grid>
  )
}

<<<<<<< HEAD
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
=======
  export default class UserDashboard extends Component {

    render () {
      return(
        <div className="container">
          <UserDescription/>
          <UserInterests/>
        </div>
        )
      }
}
>>>>>>> 88dc9e7b940d72ac35f5a9151cf349ab03570a22
