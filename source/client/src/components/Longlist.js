import React from 'react';
import Container from '@material-ui/core/Container';
import LonglistBoard from './LonglistBoard';

export default function Longlist(props) {
  return (
    <Container>
      <LonglistBoard openSnackbar={props.openSnackbar} />
    </Container>
  );
}
