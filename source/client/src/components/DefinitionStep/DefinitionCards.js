import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import {
  Card,
  Typography,
  CardContent,
  TextField,
  Grid,
  Icon
} from '@material-ui/core';

/**
 * @ignore
 */
const styles = theme => ({
  img: {
    width: 30,
    float: 'right'
  },
  field: {
    marginTop: 0
  }
});

/**
 * This is the class creating each field in the definition page
 */
class DefinitionCards extends React.Component {
  /**
   * Function which save every change in each field
   * @param {Object} e - This is the event contaning text entered in a field
   * @param {string} name - This is the field name in the database
   */
  handleChange(e, name) {
    this.props.handleChange(e, name);
  }
  /**
   * Function creating one card based on a name
   * @param {string} key - This is the field name in the database
   * @param {string} name - This is the complete field name
   * @param {string} text - This is a short description of the field
   */
  createCard(key, name, text) {
    const { classes } = this.props;
    return (
      <Card>
        <CardContent>
          <Icon>
            <img
              className={classes.img}
              src={`/content/svg_icon/${key}.svg`}
              alt={name}
            />
          </Icon>
          <Typography variant='h6'>{name}</Typography>
          <Typography variant='subtitle2' color='textSecondary'>
            {text}
          </Typography>
          <TextField
            className={classes.field}
            onChange={e => this.handleChange(e, key)}
            id='standard-basic'
            label='Type here'
            margin='normal'
            value={this.props.kpiList.definitionField.get(key)||''}
          />
        </CardContent>
      </Card>
    );
  }
  /**
   * Function which create all the cards used in the definition step
   */
  generateCards() {
    const { classes } = this.props;
    return (
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Icon>
                <img
                  className={classes.img}
                  src={`/content/svg_icon/name.svg`}
                  alt='KPI Name'
                />
              </Icon>
              <Typography variant='h6'>KPI Name</Typography>
              <Typography variant='subtitle2'>
                {this.props.kpiList.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          {this.createCard('purpose', 'Purpose', 'Why should we measure this?')}
        </Grid>
        <Grid item xs={4}>
          {this.createCard(
            'formula',
            'Definition or Formula',
            "If there's any calculation, how the measure is worked out?"
          )}
        </Grid>
        <Grid item xs={4}>
          {this.createCard(
            'targets',
            'Targets',
            'What score do we want to achieve? (if already know)'
          )}
        </Grid>
        <Grid item xs={4}>
          {this.createCard('customers', 'Customer', 'Who will use this KPI?')}
        </Grid>
        <Grid item xs={4}>
          {this.createCard(
            'resources',
            'Production Resources',
            'What resources are needed to produce the KPI and reports?'
          )}
        </Grid>
        <Grid item xs={4}>
          {this.createCard(
            'outcomes',
            'Targets Outcomes',
            'What score do we want to achieve? (if already know)'
          )}
        </Grid>
        <Grid item xs={4}>
          {this.createCard(
            'datasources',
            'Data Sources',
            'Where will the KPI data come from?'
          )}
        </Grid>
        <Grid item xs={4}>
          {this.createCard(
            'problems',
            'Problems and Errors',
            'What are the known issues with KPI production & accuracy?'
          )}
        </Grid>
        <Grid item xs={4}>
          {this.createCard(
            'cost',
            'Production Cost',
            'What is the cost of implementing and producing the KPI?'
          )}
        </Grid>
      </Grid>
    );
  }
  /**
   * @ignore
   */
  render() {
    return <div>{this.generateCards()}</div>;
  }
}

export default withStyles(styles)(DefinitionCards);
