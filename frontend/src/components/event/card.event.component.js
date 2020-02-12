import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


// import concert from '../public/images/concert.jpg';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginLeft: 20,
  },
  media: {
   height: 0,
   paddingTop: '56.25%', // 16:9
 },
 large: {

 }
});

export default function ImgMediaCard(props){
  const {eventData} = props

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
            <Button size="small" color="primary">
              Participer
            </Button>
            <Button size="small" color="primary">
              Voir
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}