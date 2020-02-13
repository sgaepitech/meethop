import React, { Component, useState } from 'react';
import {
    Dialog,
    DialogContent,
    Typography,
    Grid,
    IconButton,
    ListItem
} from '@material-ui/core';
import {
    Cancel,
} from '@material-ui/icons';
import Participate from './participation.event.component'
 
export default function DetailEvent(props) {
    const {open, onClose, eventData} = props

    return (
        <Dialog maxWidth='xl' open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
            <DialogContent>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography gutterBottom variant="h5" component="h2">
                    {props.eventData.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                    {props.eventData.description}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                        {props.eventData.date}
                        </Typography>
                    </Grid>
                    <Grid spacing={6} item xs={5}>
                        <Typography component="h3">Owner</Typography>
                        <Typography component="p">{props.eventData.owner}</Typography>
                        
                        <Typography component="h3">Participants</Typography>
                        <ListItem>{props.eventData.participants.map((item) => item)}</ListItem>
                        <Typography component="h3">Waiting</Typography>
                        <ListItem>{props.eventData.waitingList.map((item) => item)}</ListItem>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton open={props.open} onClick={props.onClose} aria-label="close">
                            <Cancel />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Participate eventID={props.eventData._id} />
                </Grid>
            </DialogContent>
        </Dialog>
    );
}