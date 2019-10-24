import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
<<<<<<< HEAD
import ShortListingBoard from './ShortListingBoard'
import { Container } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  board : {
    padding : theme.spacing(3)
=======
import Container from '@material-ui/core/Container';
import ShortListingBoard from './ShortListingBoard'

const useStyles = makeStyles(theme => ({
  root : {
  },
  test : {
    margin : theme.spacing(20,0,20,0),
>>>>>>> Drag n' drop implementation
  }
}));

export default function ShortListing(props) {
  const classes = useStyles();

  return (
<<<<<<< HEAD
    <Container>
      <div className={classes.board}>
=======
    <Container className={classes.root}>
      <div className={classes.test}>
>>>>>>> Drag n' drop implementation
        <ShortListingBoard/>
      </div>
    </Container>
  );
}