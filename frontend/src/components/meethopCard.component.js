import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import InterestsChips from './interestsChips.component';

const useStyles = makeStyles({
    card: {
        maxWidth: '100%',
    },
    cardhead: {
        color: "#fff",
        backgroundColor: "#e66465",
    },
    carduser: {
        minHeight: '100px'
    },
});

const ContentWidget = (props) => {

    if (props.type === "User Informations" || props.type === "User Description") {
        console.log("info or desc");
        return (
            <Typography variant="body2" color="textSecondary" component="p">
                {props.content}
            </Typography>
        );
    };
    if (props.type === "User Interests") {
        console.log("interests");
        return (
            <InterestsChips content={props.content} />
        );
    };
};

export default function MeethopCard(props) {
    if (props.user) {
        var user = <span>
            <strong>Username:</strong> {props.user.username}<br />
            <strong>Email:</strong> {props.user.email}<br />
            <strong>Location:</strong> {props.user.localisation}<br />
            <strong>Birthdate:</strong> {props.user.birthdate}<br />
        </span>;
    }

    if (props.interests) {
        var interests = props.interests;
    }
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardHeader
                title={props.title}
                className={classes.cardhead}
            >
            </CardHeader>
            <CardContent className={classes.carduser}>
                <ContentWidget type={props.title} content={user || props.description || interests} />
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    Edit
                </Button>
            </CardActions>
        </Card>
    );
}