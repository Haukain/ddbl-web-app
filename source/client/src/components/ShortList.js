import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ShortListBoard from './ShortListBoard'
import { Container } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  board : {
    padding : theme.spacing(3)
  }
}));

export default function ShortList(props) {
  const classes = useStyles();

  return (
    <Container>
      <div className={classes.board}>
        <ShortListBoard/>
      </div>
    </Container>
  );
}