import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  button: {
    margin: theme.spacing(3),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Grid container>
        
        <RouterLink to="/signup">
            <Grid item xs>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.button}
                >
                Sign Up
                </Button>
            </Grid>
        </RouterLink>
        <RouterLink to="/signin">
            <Grid item xs>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.button}
                >
                Sign In
                </Button>
            </Grid>
        </RouterLink>
    </Grid>
    </Container>
  );
}