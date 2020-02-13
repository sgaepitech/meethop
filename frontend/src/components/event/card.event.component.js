import React from 'react';
import {
  makeStyles,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  Paper
} from '@material-ui/core';
import Participate from '../event/participation.event.component'
import DetailEvent from './detail.event.component';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginLeft: 20,
  },
  media: {
   height: 0,
   paddingTop: '56.25%', // 16:9
 }
});

export default function ImgMediaCard(props){
  const {eventData} = props
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  return(
    <Grid justify='center' container spacing={3}>
      <Grid item xs={3}>
        <Paper className={classes.paper}></Paper>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
              component="img"
              alt={props.eventData.category}
              height="140"
              image={require('../../img/concert.jpg')}
              className={classes.large}
              title="Concert"
            />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {props.eventData.title}
                  </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {props.eventData.description}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {props.eventData.date}
                </Typography>
              </CardContent>
            </CardActionArea>
          <CardActions>
            <Button variant="outlined" color='primary' onClick={handleOpen}>Voir</Button>
            <DetailEvent eventData={props.eventData} open={open} onClose={handleClose} />
          </CardActions>
          <CardActions>
            <Participate eventID={props.eventData._id} />
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}