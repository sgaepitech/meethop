import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';

import InterestsChips from './interestsChips.component';
import UserEditForm from './userEditForm.component';
import '../../css/userProfile.css'

const ContentWidget = (props) => {
    //console.log("Content widget", props.content)
    if (props.type === "User Informations" || props.type === "User Description"){
        if (props.edition){
            return (
                <UserEditForm user={props.user} edition={props.edition} type={props.type}/>
            );
        }
        return (
            <UserEditForm user={props.user} edition={props.edition} type={props.type}/>
        );
    }

    if (props.type === "User Interests") {
        return (<div>
            {props.content !== undefined ? <InterestsChips user={props.user} content={props.content} edition={props.edition} /> : "Please wait... Loading in progress"}
        </div>
        );
    };
};

export default class MeethopCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.title,
            userInfo: this.props.user,
            loading: true,
            editMode: false,
        };
        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
    }

    getData() {
        //console.log("print in getData - card component", this.props);
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
        this.setState({ loading: false })
        //console.log(this.state);

    }

    handleClickEdit() {
        this.setState({ editMode: true })
    };

    handleClickSave() {
        this.setState({ editMode: false })
    };

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate() {
        //console.log("render - didUpdate: ", this.state);
    }

    render() {
        //console.log("render - meethop card: ", this.state);
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
                        edition={this.state.editMode}
                        user={this.state.userInfo}
                    />
                </CardContent>
                <CardActions>
                    <Button className="edition" size="small" variant="outlined" color="secondary" onClick={this.state.editMode ? this.handleClickSave : this.handleClickEdit}>
                        {this.state.editMode ? "Stop editing" : "Edit"}
                    </Button>
                </CardActions>
            </Card>
        );
    }
}