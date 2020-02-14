import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {
    Button,
    Chip,
} from '@material-ui/core/';

import AssistantIcon from '@material-ui/icons/Assistant';

const useStyles = makeStyles(theme => ({

    present: {
        margin: theme.spacing(0.5),
        backgroundColor: "blue",
        color: "#fff",
    },
    absent: {
        margin: theme.spacing(0.5),
        backgroundColor: "red",
        color: "#fff",
    },
}));
const existingInterests = ["theater", "museum", "nautic", "shopping", "board_games", "concert", "sport", "outdoor"];

export default function InterestsChips(props) {

    const classes = useStyles();

    var displayInterests = existingInterests.map((obj, i) => {
        var rObj = {};
        rObj.key = i;
        rObj.label = obj;
        return rObj;
    });

    const [userInterests, setUserInterests] = React.useState(props.user.interests);

    function arrayRemove(arr, value) {

        return arr.filter(function (ele) {
            return ele !== value;
        });

    }

    const handleClick = pressedChips => () => {
        let newUserInterests = userInterests.slice();
        if (!userInterests.includes(pressedChips.label)) {
            newUserInterests.push(pressedChips.label);
            setUserInterests(newUserInterests);
        }
        else if (userInterests.includes(pressedChips.label)) {
            newUserInterests = arrayRemove(newUserInterests, pressedChips.label);
            setUserInterests(newUserInterests);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const interests = { interests: userInterests };

        fetch('http://localhost:5000/user/update', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTM5OTg1NTk2ZWIyZTFiZDZiOWRiMjIiLCJpYXQiOjE1ODE2MDIxOTF9.JWoyPThZG4S_p-pQKvaYXVqqCyDb4um5QezPctBxA-I'
            },
            body: JSON.stringify(interests),
        })
            .then(res => res.json())/* 
            .then(res => console.log(res)); */
    }

    return (
        <div>
            {displayInterests.map(data => {
                return (
                    <div>

                        {props.edition ?
                            <Button
                                key={data.key}
                                variant="outlined"
                                color="primary"
                                className={userInterests.includes(data.label) ? classes.present : classes.absent}
                                startIcon={<AssistantIcon />}
                                onClick={handleClick(data)}
                            >
                                {data.label}
                            </Button>
                            :
                            <Chip
                                key={data.key}
                                label={data.label}
                                variant="outlined"
                                color="primary"
                                className={userInterests.includes(data.label) ? classes.present : classes.absent}
                            />
                        }

                    </div>
                );
            })}
            <form onSubmit={handleSubmit} noValidate>
                <Button
                    disabled={props.edition ? false : true}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Save
                        </Button>
            </form>
        </div>
    );
}