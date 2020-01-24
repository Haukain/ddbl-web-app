import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ShortListBoard from './ShortListBoard'

/**
 * @ignore
 */
const useStyles = makeStyles(theme => ({
  board : {
    padding : theme.spacing(3)
  }
}));
/**
 * This is the main function for the shortlisting phase
 */
export default function ShortList(props) {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.board}>
        <ShortListBoard openSnackbar={props.openSnackbar} />
      </div>
    </div>
  );
}