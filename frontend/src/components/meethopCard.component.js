import React, { Component } from 'react';
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
    console.log("Content widget", props.content)
    if (props.type === "User Informations" || props.type === "User Description") {
        return (
            <Typography variant="body2" color="textSecondary" component="p">
                {props.content !== undefined ? props.content : "Nothing to display... Maybe a missing non mandatory field ?"}
            </Typography>
        );
    };
    if (props.type === "User Interests") {
        return (<div>
            {props.content !== undefined ? <InterestsChips content={props.content} /> : "Please wait... Loading in progress"}
            </div>
        );
    };
};

export default class MeethopCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.title,
            message: "",
            loading: true,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    getData() {
        console.log("print in getData - card component", this.props);
        if (this.props.user) {
            this.setState({ toPut: "user", data: this.props.user });
            this.setState({ user: <span><strong>Username:</strong> {this.props.user.username}<br /><strong>Email:</strong> {this.props.user.email}<br /><strong>Location:</strong> {this.props.user.location}<br /><strong>Birthdate:</strong> {this.props.user.birthdate}<br /></span> });
        }

        if (this.props.interests) {
            this.setState({ toPut: "interests", data: this.props.interests });
        }

        if (this.props.description) {
            this.setState({ toPut: "description", data: this.props.description });
        }
        this.setState({loading: false})
        console.log(this.state);

    }

    handleClick() {
        axios.put('http://localhost:5000/user/update/', {
            [this.state.toPut]: [this.state.data],
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

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate() {
        console.log("render - didUpdate: ", this.state);
    }

    callbackFunction = (childData) => {
        this.setState({ message: childData })
    }

    render() {
        console.log("render - meethop card: ", this.state);
            return (
                <Card className="card" >
                    <CardHeader
                        title={this.props.title}
                        className="cardhead"
                    >
                    </CardHeader>
                    <CardContent className="carduser">
                        <ContentWidget
                            type={this.props.title}
                            content={this.state.user || this.state.data}
                        />
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" onClick={this.handleClick}>
                            Save
                </Button>
                    </CardActions>
                </Card>
            );
    }
}