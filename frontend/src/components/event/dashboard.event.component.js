import React, { Component } from 'react'
import { Grid, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Fab from '@material-ui/core/Fab';

const style = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
};

export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            userParticipation: ['event1', 'event2'],
            userCreated: '',
            openEvent: ''            
        }
        this.getEventOwnedByUser();
    }

    getEventOwnedByUser = () => {
        fetch("http://localhost:5000/event/owner", {
            method: "GET",
            headers: { "x-access-token": localStorage.getItem('accessToken')}
        })
            .then((data) => data.json())
            .then((res)=> this.setState({
                userCreated: res
                })
            )
    }

    getEventUserParticipate = () => {
        fetch("http://localhost:5000/event/read", {
            method: "GET",
            headers: { "x-access-token": localStorage.getItem('accessToken')}
        })
            .then((data) => data.json())
            .then((res)=> this.setState({
                user: res
                })
            )
    }

    // handleClick = (e) => {
    //     this.setState({
    //         eventStatus:
    //     })
    // }

    handleEventChange = (e) => {
        this.setState({
            openEvent: e
        })
    }

    render() {
        if(this.state.userCreated === '') {
            return (
                <div>Loading</div>
            )
        }

        console.log('-----------------------')
        console.log('---------RENDER--------')
        console.log(this.state)
        console.log('-----------------------')

        let details;

        return (
            <Grid container item xs={12}>
                <Grid container item xs={3} justify="center" alignItems="center">
                    {/* {this.state.userParticipation.map(data => {
                        return (
                            console.log('je suis la ' + data)
                            // data to generate
                        );
                    })} */}
                    <List>
                        <ListItem>
                            <Typography variant='h3'>Je participe!</Typography>
                        </ListItem>
                        <ListItem button>
                            <ListItemAvatar>
                            <Avatar>
                                <ImageIcon />
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemAvatar>
                            <Avatar>
                                <WorkIcon />
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Work" secondary="Jan 7, 2014" />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemAvatar>
                            <Avatar>
                                <BeachAccessIcon />
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Vacation" secondary="July 20, 2014" />
                        </ListItem>
                    </List>
                </Grid>
                <Fab variant='extended' style={style}>
                    <AddCircleOutlineIcon />
                    Créer un évènement
                </Fab>
                <Grid container item xs={6} justify="center" alignItems="center">
                    {details}
                </Grid>
                <Grid container item xs={3} justify="center" alignItems="center">
                    <List>
                        <ListItem>
                            <Typography variant='h3'>Mes évènements</Typography>
                        </ListItem>
                        {this.state.userCreated.map(data => {
                            return (
                                <ListItem button>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <ImageIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={data.title} secondary={data.date} />
                                </ListItem>
                            );
                        })}
                    </List>
                </Grid>
            </Grid>
        )
    }
}