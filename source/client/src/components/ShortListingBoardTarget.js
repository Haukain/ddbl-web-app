import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  target: {
    height : 400,
    border : '1px black solid'
  },
  grid : {
    height : '100%'
  },
  cell00 : {
    backgroundColor : 'yellow',
    height: '50%'
  },
  cell01 : {
    backgroundColor : 'green',
    height: '50%'
  },
  cell10 : {
    backgroundColor : 'red',
    height: '50%'
  },
  cell11 : {
    backgroundColor : 'yellow',
    height: '50%'
  }
}));

export default function ShortListingBoardTarget(props) {
  const classes = useStyles();

  return (
    <div className={classes.target}>
      <Grid container className={classes.grid}>
        <Grid item xs={6} className={classes.cell00}>
        </Grid>
        <Grid item xs={6} className={classes.cell01}>
        </Grid>
        <Grid item xs={6} className={classes.cell10}>
        </Grid>
        <Grid item xs={6} className={classes.cell11}>
        </Grid>
      </Grid>
    </div>
  );
}