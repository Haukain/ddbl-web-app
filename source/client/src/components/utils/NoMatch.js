import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';

const styles = theme => ({
  root: {
    paddingTop : theme.spacing(10),
    textAlign : "center"
  },
  button: {
    margin: theme.spacing(5),
  },
});

class NoMatch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return (
      <Container>
        <div className={classes.root}>
          <Typography gutterBottom variant='h4'>
            Page not found
          </Typography>
          <Typography gutterBottom variant='body1'>
          Maybe the page you are looking for has been removed, or you typed in the wrong URL
          </Typography>
          <Button
              component={RouterLink}
              to='/'
              variant="outlined"
              color="primary"
              className={classes.button}
              startIcon={<HomeIcon />}
            >
            Take me back home
          </Button>
        </div>
      </Container>
    )
  }
}

export default withStyles(styles)(NoMatch);;
