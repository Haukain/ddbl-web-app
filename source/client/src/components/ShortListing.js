import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ShortListingBoard from './ShortListingBoard'
import { Container } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  board : {
    padding : theme.spacing(3)
  }
}));

export default function ShortListing(props) {
  const classes = useStyles();

  return (
    <Container>
      <div className={classes.board}>
        <ShortListingBoard/>
      </div>
    </Container>
  );
}