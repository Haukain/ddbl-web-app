import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import DefinitionBoard from './DefinitionBoard';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(theme => ({
  board : {
    maxHeight: "655px",
  },
  saveButton: {
    margin: 0,
    top: 7,
    right: 20,
    bottom: 'auto',
    left: 'auto',
    position: 'fixed',
  },
}));

export default function Definition(props) {
  const classes = useStyles();
  return (
    <div>
        <DefinitionBoard openSnackbar={props.openSnackbar} />
        <Fab color="secondary" className={classes.saveButton} variant="extended">
          Open Visualization
        </Fab>
    </div>
  );
}
