import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  CardActionArea
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop : theme.spacing(10)
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1
  }
}));

export default function SignIn(props) {
  const classes = useStyles();

  return (
    <Container>
      <Grid container spacing={10} className={classes.root}>
        <Grid item xs={4}>
          <Card className={classes.card}>
            <CardActionArea component={RouterLink} to='/longlist'>
              <CardMedia
                className={classes.cardMedia}
                image='/content/images/longlist.png'
                title='Longlist step'
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant='h5' component='h2'>
                  Longlisting
                </Typography>
                <Typography>
                  Import an existing KPI tree or create one to begin the project
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size='small' color='primary'>
                More info
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card className={classes.card}>
            <CardActionArea component={RouterLink} to='/shortlist'>
              <CardMedia
                className={classes.cardMedia}
                image='/content/images/shortlist.png'
                title='Shortlist step'
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant='h5' component='h2'>
                  Shortlisting
                </Typography>
                <Typography>
                  Through the shortlisting step, you will reduce your amount of
                  KPIs
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size='small' color='primary'>
                More info
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card className={classes.card}>
            <CardActionArea component={RouterLink} to='/definition'>
              <CardMedia
                className={classes.cardMedia}
                image='/content/images/definition.png'
                title='Definition step'
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant='h5' component='h2'>
                  Definition
                </Typography>
                <Typography>
                  Define your KPIs on multiple topics and visualize them
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size='small' color='primary'>
                More info
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
