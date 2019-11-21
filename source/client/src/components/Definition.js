import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import DefinitionBoard from './DefinitionBoard';

const useStyles = makeStyles(theme => ({
  centeredButton: {
    left: '50%'
  },
  grid: {
    height: 1100
  }
}));

export default function Definition(props) {
  const classes = useStyles();
  return (
    <div>
      <Grid item xs={12} className={classes.grid}>
        <DefinitionBoard />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant='contained'
          color='primary'
          className={classes.centeredButton}
        >
          Open Visualization
        </Button>
      </Grid>
    </div>
  );
}
