import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DefinitionBoard from './DefinitionBoard';
import Fab from '@material-ui/core/Fab';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  board : {
    maxHeight: "650px",
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
        <Fab color="secondary" component={RouterLink} to='/visualization' className={classes.saveButton} variant="extended">
          Open Visualization
        </Fab>
    </div>
  );
}
