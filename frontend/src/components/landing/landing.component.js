import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography, Box, Link} from '@material-ui/core/';
import Register from '../register/register.component';
import "../../css/reset.css"
import "../../css/text.css"
import "../../css/landingpage.css"

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
    )
}

function Copyright() {
    return (
      <Box mt={8}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://material-ui.com/">
            MeetHop
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Box>
    );
}

export default class landingPage extends Component {
    constructor(){
        super();
        this.state={
            open: false
        }
    }

    handleOpen = () => {
        this.setState({
            open: true
        });
    };
    
    handleClose = () => {
        this.setState({
            open: false
        });
    };
    
    render () {
      return(
        <div className="bg-lp" style={{height: "100%"}}>
            <div className="bg-filter" style={{height: "100%"}}>
                <TextTitle />
                <Grid container justify="center">
                    <Button variant="contained" color="primary" onClick={this.handleOpen}>Register</Button>
                </Grid>
                <Register open={this.state.open} onClose={this.handleClose} />
                <Copyright />
            </div>
        </div>
    )}
}