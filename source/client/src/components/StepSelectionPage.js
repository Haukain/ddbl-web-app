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
  CardActionArea,
  Dialog,
  DialogTitle,
  DialogContent
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

/**
 * @ignore
 */
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

const summaries = [
  {
      "title" : "Longlist",
      "summary" : (<div><Typography gutterBottom align={'justify'}>For the <b>Longlisting step</b> it is essential to list every single KPI of every single department within your organization.</Typography>
      <Typography gutterBottom align={'justify'}>Later stages will focus on filtering these KPIs but in this step we will only be focusing on gathering every KPI in the organization.</Typography></div>)
  },
  {
      "title" : "Shortlist",
      "summary" : (<div><Typography gutterBottom align={'justify'}>In the <b>Shortlisting step</b> we will be focusing on bringing the number of KPIs down to a manageable amount by looking into the importance and ease of measure of every single KPI.</Typography>
      <Typography gutterBottom align={'justify'}>By sorting the KPIs based on the importance and ease of measure we will bring down the total number of KPIs, this will lead to less clutter of KPI management and the gathering of the information to calculate the KPIs.</Typography></div>)
  },
  {
      "title" : "Definition" ,
      "summary" : (<div><Typography gutterBottom align={'justify'}>In the <b>Definition step</b> we will be gathering the meta-data behind the KPIs such as who is responsible for the KPI and what does the KPI cost to measure it?</Typography>
      <Typography gutterBottom align={'justify'}>This will give more insight and maybe lead to not measuring the KPI since it cost simply too much or isn’t that important after all.</Typography>
      <Typography gutterBottom align={'justify'}>By defining the KPIs you will get more insight in the KPIs that are being measured.</Typography>
      <Typography gutterBottom align={'justify'}>The visuals of the <b>visualization panel</b> will provide you with information about the meta-data behind the KPIs.</Typography>
      <Typography gutterBottom align={'justify'}>This will give you insight on who is responsible for the most KPIs or what the most occurring problem is with the current list of KPIs.</Typography>
      <Typography gutterBottom align={'justify'}>Based on this information you can make it easier to measure the current list of KPIs.</Typography>
      <Typography gutterBottom align={'justify'}>This gives more freedom to do other tasks within the company.</Typography></div>)
  }
]

export default function StepSelectionPage(props) {
  const classes = useStyles();

  const [dialog,setDialog] = React.useState(false)
  const [info,setInfo] = React.useState({title:'',summary:''})

  function openDialog(i) {
    setInfo(summaries[i])
    setDialog(true)
  }

  function closeDialog() {
    setDialog(false)
  }

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
                  Longlist
                </Typography>
                <Typography>
                  Import an existing KPI tree or create one to begin the project
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size='small' color='primary' onClick={() => openDialog(0)}>
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
                  Shortlist
                </Typography>
                <Typography>
                  Through the shortlist step, you will reduce your amount of
                  KPIs
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size='small' color='primary' onClick={() => openDialog(1)}>
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
              <Button size='small' color='primary' onClick={() => openDialog(2)}>
                More info
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Dialog onClose={closeDialog} aria-labelledby="customized-dialog-title" open={dialog}>
        <DialogTitle id="customized-dialog-title" onClose={closeDialog}>
          {info.title}
        </DialogTitle>
        <DialogContent dividers>
          {info.summary}
        </DialogContent>
      </Dialog>
    </Container>
  );
}
