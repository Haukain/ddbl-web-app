import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LonglistXMLImport from './LonglistXMLImport'

const useStyles = makeStyles(theme => ({
}));

export default function Longlist(props) {
  const classes = useStyles();

  return (
    <Container>
        <LonglistXMLImport/>
    </Container>
  );
}