import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {Avatar, Button, ButtonBase, Chip, Grid, Paper, Typography} from '@material-ui/core/';

import AssistantIcon from '@material-ui/icons/Assistant';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';




const SampleUser = {
  username: 'Toto',
  avatar: '../../public/images/avatar_sample.png',
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
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 800,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  customIconSize: {
    width: '100%',
    height: '100%',
    color: '#E12B38',
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

//<Avatar alt={SampleUser.username} src={SampleUser.avatar} className={classes.large} />

const UserInformation = () => {
  let classes = useStyles();
  return(
  <div className={classes.root}>
      <Paper className={classes.paper}>
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

const UserDescription = () => {
  let classes = useStyles();
  return(
  <div className={classes.root}>
      <Paper className={classes.paper}>
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
              <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                    <Avatar alt={SampleUser.username} src={SampleUser.avatar} className={classes.large} />
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
        </Grid>
      </Paper>
    </div>
  )}

  export default class UserProfile extends Component {
    
    render () {

      return(
        <div className="container">
                <UserDescription />
                <UserInterests />
            </div>
        )
      }
}