import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {
    Button,
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

const existingInterests = ["concert", "sport", "plein air", "cinéma", "théatre", "expo/musée", "nautique", "shopping", "foire et salons", "jeux de société"];

export default function InterestsChips(props) {
    const classes = useStyles();
    var displayInterests = existingInterests.map((obj, i) => {
        var rObj = {};
        rObj.key = i;
        rObj.label = obj;
        return rObj;
    });

    const [userInterests, setUserInterests] = React.useState(props.content);

    function arrayRemove(arr, value) {

        return arr.filter(function(ele){
            return ele !== value;
        });
     
    }
    
    const handleClick = pressedChips => () => {
        let newUserInterests = userInterests.concat(userInterests);
        if (!userInterests.includes(pressedChips.label)){
            newUserInterests.push(pressedChips.label);
            setUserInterests(newUserInterests);
        }
        else if (userInterests.includes(pressedChips.label)){
            newUserInterests = arrayRemove(newUserInterests, pressedChips.label);
            setUserInterests(newUserInterests);
        }
    };

    return (
        <div>
            {displayInterests.map(data => {
                return (
                    <Button
                        key={data.key}
                        variant="outlined"
                        color="primary"
                        className={userInterests.includes(data.label) ? classes.present : classes.absent }
                        startIcon={<AssistantIcon />}
                        onClick={handleClick(data)}
                    >
                        {data.label}
                    </Button>
                );
            })}
        </div>
    );
}