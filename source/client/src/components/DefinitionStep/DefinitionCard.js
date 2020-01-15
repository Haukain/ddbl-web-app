import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import {
  Card,
  Typography,
  CardContent,
  TextField,
  Icon
} from '@material-ui/core';

const styles = theme => ({
  img: {
    width: 30,
    float: 'right'
  },
  field: {
    marginTop: 0
  }
});

class DefinitionCard extends React.Component {
  
    constructor(props){
        super(props);                  
    }

    handleChange(e, name) {
      this.props.handleChange(e, name);
    }

  render() {
    const { classes } = this.props;
    return (
      <Card>
        <CardContent>
          <Icon>
            <img
              className={classes.img}
              src={`/content/svg_icon/${this.props.key1}.svg`}
              alt={classes.name}
            />
          </Icon>
          <Typography variant='h6'>{this.props.name}</Typography>
          <Typography variant='subtitle2' color='textSecondary'>
            {this.props.text}
          </Typography>
          <TextField
            className={classes.field}
            onChange={e => this.handleChange(e, this.props.key1)}
            label='Type here'
            margin='normal'
            value={this.props.purposeValue}
          />
        </CardContent>
      </Card>
    );
  }

 
}

export default withStyles(styles)(DefinitionCard);
