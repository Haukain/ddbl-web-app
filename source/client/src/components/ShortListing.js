import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ShortListingBoard from './ShortListingBoard'

const useStyles = makeStyles(theme => ({
  board : {
  }
}));

export default function ShortListing(props) {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.board}>
        <ShortListingBoard/>
      </div>
    </div>
  );
}