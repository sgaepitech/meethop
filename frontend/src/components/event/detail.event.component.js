import React, { Component } from 'react';
import {
    Dialog,
    DialogContent,
    Typography,
    Grid,
    IconButton
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
                    
                    <Typography component="h3">Participants</Typography>
                    <Typography component="h3">Waiting</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton open={props.open} onClick={props.onClose} aria-label="close">
                            <Cancel />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Participate />
                </Grid>
            </DialogContent>
        </Dialog>
    );
}