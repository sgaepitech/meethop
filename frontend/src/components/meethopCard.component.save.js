import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import axios from 'axios';

import InterestsChips from './interestsChips.component';
import '../css/cards.css'

const ContentWidget = (props) => {

    if (props.type === "User Informations" || props.type === "User Description") {
        return (
            <Typography variant="body2" color="textSecondary" component="p">
                {props.content !== undefined ? props.content : "Nothing to display... Maybe a missing non mandatory field ?"}
            </Typography>
        );
    };
    if (props.type === "User Interests") {
        return (
            <InterestsChips content={props.content} />
        );
    };
};

export default class MeethopCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: ""
        };
    }

    getData() {
        if (this.props.user) {
            var data = props.user;
            var user = <span>
                <strong>Username:</strong> {props.user.username}<br />
                <strong>Email:</strong> {props.user.email}<br />
                <strong>Location:</strong> {props.user.location}<br />
                <strong>Birthdate:</strong> {props.user.birthdate}<br />
            </span>;
        }

        if (this.props.interests) {
            var data = props.interests.interests;
        }

        if (this.props.description) {
            var data = props.description;
        }
    }

    const handleClick = (cardType, data) => () => {
        console.log(cardType);
        console.log(data);
        axios.put('http://localhost:5000/user/update/', {
            interests: data,
        },
            {
                headers: {
                    'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTM5OTg1NTk2ZWIyZTFiZDZiOWRiMjIiLCJpYXQiOjE1ODA5MjQzODl9.KpjyOP9WqAIkJcjkvLQprqzcQvtOqRUM124T_QKoFwk',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            })

    };

    /* callbackFunction = (childData) => {
        this.setState({message: childData})
    } */

    return(
        <Card className = "card" >
            <CardHeader
                title={props.title}
                className="cardhead"
            >
            </CardHeader>
            <CardContent className="carduser">
                <ContentWidget
                    type={props.title}
                    content={user || data}
                />
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={handleClick(props.title, data)}>
                    Save
                </Button>
            </CardActions>
        </Card>
    );
}