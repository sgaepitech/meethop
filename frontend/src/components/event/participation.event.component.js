import React, { Component } from 'react';
import {
    Button,
    Grid
} from '@material-ui/core';
import {
    Cancel,
    CheckCircle
} from '@material-ui/icons';

export default class Participate extends Component {
    constructor(props){
        super();
        this.state={
            waitingList: '',
            id: props.eventID
        }
    }

    handleParticipationOKChange = () => {
        let participationURI = 'http://localhost:5000/event/postulate/'+this.state.id
        fetch(participationURI, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'x-access-token': localStorage.getItem('accessToken')
            }
        })
    };

    handleParticipationNopeChange = () => {
        let participationURI = 'http://localhost:5000/event/unpostulate/'+this.state.id
        fetch(participationURI, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'x-access-token': localStorage.getItem('accessToken')
            }
        })
    };

    render() {
        console.log(this.state)
        return (
            <Grid container>
                <Grid item xs={6}>
                    <Button 
                        className={'participationBtn'}
                        variant="contained"
                        color="primary"
                        size="large"
                        value='true'
                        onClick={this.handleParticipationOKChange}
                        endIcon={<CheckCircle />}
                    >
                        I'm in
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        className='participationBtn'
                        variant="contained"
                        color="secondary"
                        size="large"
                        value='false'
                        onClick={this.handleParticipationNopeChange}
                        endIcon={<Cancel />}
                    >
                        I'm out
                    </Button>
                </Grid>
           </Grid>
        );
    }
}