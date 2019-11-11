import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DefinitionBoard from './DefinitionBoard'

const useStyles = makeStyles(theme => ({
}));

export default function Definition(props) {
  const classes = useStyles();

  return (
    <div>
        <DefinitionBoard/>
    </div>
  );
}