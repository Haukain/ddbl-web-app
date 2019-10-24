import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ShortListingBoard from './ShortListingBoard'

const useStyles = makeStyles(theme => ({
  root : {
  },
  test : {
    margin : theme.spacing(20,0,20,0),
  }
}));

export default function ShortListing(props) {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <div className={classes.test}>
        <ShortListingBoard/>
      </div>
    </Container>
  );
}