import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Avatar, Button, ButtonBase, Chip, Grid, Paper, Typography, TextField} from '@material-ui/core/';
import Register from './form/register.form';
import Login from './form/login.form';
import "../css/reset.css"
import "../css/text.css"
import "../css/landingpage.css"

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        height: "100%",
        margin: 0,
    },
    body: {
        height: "100%",
        margin: 0,
    },
    titleLP: {
        fontFamily: "'Montserrat', sans-serif",
        fontSize: 72,
        fontWeight: 700,
        color: "#FFFFFF",
        paddingTop: "5rem",
    },
  }));

const TextTitle = () => {
    let classes = useStyles();
    return(
          <Grid container justify = "center">
            <Typography className={classes.titleLP} style={{whiteSpace: 'pre-line'}}>
                Create your experience.{"\n"}
                Meet new people.{"\n"}
                Have fun!
            </Typography>
          </Grid>
)}

export default class landingPage extends Component {
    
    render () {
      return(
        <div className="bg-lp" style={{height: "100%"}}>
            <div className="bg-filter" style={{height: "100%"}}>
                <TextTitle />
                <Register />
                <Login />
            </div>
        </div>
    )}
}