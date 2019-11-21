import React from 'react';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import SignUp from './SignUp';
import SignIn from './SignIn';

const styles = theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(/content/images/homepage.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
});

class HomePage extends React.Component{
  constructor(props){
    super(props)

    this.switchForm = this.switchForm.bind(this)
    this.generateSignUp = this.generateSignUp.bind(this)
    this.generateSignIn = this.generateSignIn.bind(this)
    
    this.state = {
      form : this.generateSignUp
    }
  }

  switchForm() {
    this.setState({form:this.state.form===this.generateSignUp?this.generateSignIn:this.generateSignUp})
  }

  generateSignUp() {
    return <SignUp switchForm={this.switchForm}/>
  }

  generateSignIn() {
    return <SignIn switchForm={this.switchForm}/>
  }

  copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  render(){
    const { classes } = this.props;

    return (
      <Grid container component="main" className={classes.root}>
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          {this.state.form()}  
          <Box mt={5}>
            {this.copyright()}
          </Box>
        </Grid>
      </Grid>
    );
  }
  
}

export default withStyles(styles, { withTheme: true })(HomePage);