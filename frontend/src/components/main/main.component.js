import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography, Box, Link} from '@material-ui/core/';
import Register from '../register/register.component';
import "../../css/reset.css"
import "../../css/text.css"
import "../../css/main.css"
import ImgMediaCard from '../event/card.event.component';

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

export default class Main extends Component {
    constructor(){
        super();
        this.state={
            open: false,
            eventList: ''
        }
        this.getEventList()
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

    getEventList = () => {
            fetch('http://localhost:5000/event', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'x-access-token': localStorage.getItem('accessToken')
            },
        })
            .then(res => res.json())
            .then(res => this.setState({
                eventList: res
            }))
            .then(() => console.log(this.state.eventList.length))
    }
    
    render () {
            if(this.state.eventList === ''){
                return <div>Loading</div>;
            } else {
                return(
                    <div className='main-container'>
                        <ImgMediaCard eventData={this.state.eventList[Math.floor(Math.random()*this.state.eventList.length)]} />
                    </div>
                )}
    }
}