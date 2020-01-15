import React from 'react';
import Container from '@material-ui/core/Container';
import LonglistBoard from './LonglistBoard';
import { makeStyles } from '@material-ui/core/styles';

/**
 * @ignore
 */
const useStyles = makeStyles(theme => ({
  root: {
    paddingTop : theme.spacing(10)
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1
  }
}));

/**
 * TODO
 */
export default function Longlist(props) {
  const classes = useStyles();

  return (
    <Container>
      <div  className={classes.root}>
        <LonglistBoard openSnackbar={props.openSnackbar}/>
      </div>
    </Container>
  );
}
