import React, { Component } from 'react';
import axios from 'axios';

import '../../css/userProfile.css'


import {
    Button,
    Chip,
} from '@material-ui/core/';

import AssistantIcon from '@material-ui/icons/Assistant';

const hardExistingInterests = ["theater", "museum", "nautic", "shopping", "board_games", "concert", "sport", "outdoor"];

export default class InterestsChips extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: this.props.user,
            userInterests: this.props.user.interests,
            existingInterests: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        //console.log(this.state.userInterests);
    }


    importInterests() {
        axios.get('http://localhost:5000/category/all/', {
            headers: { 'x-access-token':  localStorage.getItem('accessToken') }
        })
            .then(response => {
                this.setState({ existingInterests: response.data })
            });
    }

    arrayRemove(arr, value) {

        return arr.filter(function (ele) {
            return ele !== value;
        });

    }

    handleClick = param =>  e => {
        /* console.log("param: ", param)
        console.log("user interests: ", this.state.userInterests) */
        let newUserInterests = this.state.userInterests;
        if (!this.state.userInterests.includes(e.label)) {
            newUserInterests.push(e.label);
            this.setState({ userInterests: newUserInterests });
        }
        else if (this.state.userInterests.includes(e.label)) {
            newUserInterests = this.arrayRemove(newUserInterests, e.label);
            this.setState({ userInterests: newUserInterests });
        }
        //console.log("newuser interests: ", newUserInterests)
    };

    handleSubmit(e) {
        e.preventDefault();

        const interests = { interests: this.state.userInterests };

        fetch('http://localhost:5000/user/update', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'x-access-token':  localStorage.getItem('accessToken')
            },
            body: JSON.stringify(interests),
        })
            .then(res => res.json())/* 
            .then(res => console.log(res)); */
    }

    componentDidMount() {
        this.importInterests();
    }
    render() {

        //console.log(this.state.existingInterests);

        //var displayInterests = this.state.existingInterests.map((obj, i) => {
        var displayInterests = hardExistingInterests.map((obj, i) => {
            var rObj = {};
            rObj.key = i;
            rObj.label = obj;
            return rObj;
        });

        return (
            <div>
                {displayInterests.map(data => {
                    return (
                        <div>

                            {this.props.edition ?
                                <Button
                                    key={data.key}
                                    variant="outlined"
                                    className={this.state.userInterests.includes(data.label) ? "present" : "absent"}
                                    startIcon={<AssistantIcon />}
                                    onClick={this.handleClick}
                                    value={data.label}
                                >
                                    {data.label}
                                </Button>
                                :
                                <Chip
                                    key={data.key}
                                    label={data.label}
                                    variant="outlined"
                                    className={this.state.userInterests.includes(data.label) ? "present" : "absent"}
                                />
                            }

                        </div>
                    );
                })}
                <form onSubmit={this.handleSubmit} noValidate>
                    <Button
                        disabled={this.props.edition ? false : true}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="saving"
                    >
                        Save
                        </Button>
                </form>
            </div>
        )
    };

}