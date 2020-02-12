import React, { Component } from 'react';
import {
    Button
} from '@material-ui/core';
import {
    Cancel,
    CheckCircle
} from '@material-ui/icons';

export default class Participate extends Component {
    constructor(){
        super();
        this.state={
            id: '',
            participate: '',
        }
    }

    handleParticipationOKChange = (e) => {
        console.log(this.state.participate)
        this.setState({
            participate: 'true'
        });
    };

    handleParticipationNopeChange = (e) => {
        this.setState({
            participate: 'false'
        })
        console.log(this.state.participate)
    };

    // handleParticipation = (e) => {
    //     e.preventDefault();
    //     fetch('http://localhost:5000/event/postulate/:id', {
    //     method: 'POST',
    //     headers: {
    //         'Content-type': 'application/json',
    //         'x-access-token': localStorage.getItem('accessToken')
    //     },
    //     body: JSON.stringify(User),
    //     })
    //     .then(res => res.json())
    //     .then(res => localStorage.setItem('accessToken', res.token))
    //     .then(this.props.login);
    // }

    render() {
        return (
            <div width='100%'>
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
           </div>
        );
    }
}