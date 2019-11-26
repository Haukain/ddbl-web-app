import React from 'react';
import { withStyles } from '@material-ui/styles';

import {
  Card,
  Typography,
  CardContent,
  TextField,
  Grid,
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
  handleChange(e, name) {
    this.props.handleChange(e, name);
  }

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
            value={this.props.listKpis.definitionField.get(key)}
          />
        </CardContent>
      </Card>
    );
  }

  generateCard() {
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
                {this.props.listKpis.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          {this.createCard('purpose', 'Purpose', 'Why should we measure this?')}
        </Grid>
        <Grid item xs={4}>
          {this.createCard(
            'definition',
            'Definition or Formula',
            "If there's any calculation, how the measure is worked out? What is and is not included in the values used?"
          )}
        </Grid>
        <Grid item xs={4}>
          {this.createCard(
            'target',
            'Targets',
            'What score do we want to achieve? (if already know)'
          )}
        </Grid>
        <Grid item xs={4}>
          {this.createCard('customer', 'Customer', 'Who will use this KPI?')}
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
            'outcome',
            'Targets Outcomes',
            'What score do we want to achieve? (if already know)'
          )}
        </Grid>
        <Grid item xs={4}>
          {this.createCard(
            'datasource',
            'Data Sources',
            'Where will the KPI data come from?'
          )}
        </Grid>
        <Grid item xs={4}>
          {this.createCard(
            'problem',
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

  render() {
    return <div>{this.generateCard()}</div>;
  }
}

export default withStyles(styles)(DefinitionCard);
