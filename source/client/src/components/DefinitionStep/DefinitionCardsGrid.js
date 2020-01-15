import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import DefinitionCard from './DefinitionCard';

import {
  Card,
  Typography,
  CardContent,
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

class DefinitionCards extends React.Component {

 
 
  render() {
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
                {this.props.currentKpi.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={4}>
          <DefinitionCard 
            key1='purpose'
            name='Purpose'
            handleChange={this.props.handleChange}
            text='Why should we measure this?'
            purposeValue={this.props.currentKpi.definitionField.get('purpose')||''}
          />              
        </Grid>
        <Grid item xs={4}>
          <DefinitionCard 
              key1='formula'
              name='Definition or Formula'
              handleChange={this.props.handleChange}
              text="If there's any calculation, how the measure is worked out?"
              purposeValue={this.props.currentKpi.definitionField.get('formula')||''}
          />         
        </Grid>
        <Grid item xs={4}>
          <DefinitionCard 
              key1='targets'
              name='Targets'
              handleChange={this.props.handleChange}
              text="What score do we want to achieve? (if already know)"
              purposeValue={this.props.currentKpi.definitionField.get('targets')||''}
          />          
        </Grid>
        <Grid item xs={4}>
          <DefinitionCard 
              key1='customers'
              name='Customer'
              handleChange={this.props.handleChange}
              text="Who will use this KPI?"
              purposeValue={this.props.currentKpi.definitionField.get('customers')||''}
          /> 
        </Grid>
        <Grid item xs={4}>
          <DefinitionCard 
              key1='resources'
              name='Production Resources'
              handleChange={this.props.handleChange}
              text="What resources are needed to produce the KPI and reports?"
              purposeValue={this.props.currentKpi.definitionField.get('resources')||''}
          /> 
        </Grid>
        <Grid item xs={4}>
        <DefinitionCard 
              key1='outcomes'
              name='Targets Outcomes'
              handleChange={this.props.handleChange}
              text="What will achieving the target deliver ?"
              purposeValue={this.props.currentKpi.definitionField.get('outcomes')||''}
          /> 
        </Grid>
        <Grid item xs={4}>
        <DefinitionCard 
              key1='datasources'
              name='Data Sources'
              handleChange={this.props.handleChange}
              text="Where will the KPI data come from?"
              purposeValue={this.props.currentKpi.definitionField.get('datasources')||''}
          /> 
        </Grid>
        <Grid item xs={4}>
        <DefinitionCard 
              key1='problems'
              name='Problems and Errors'
              handleChange={this.props.handleChange}
              text="What are the known issues with KPI production & accuracy?"
              purposeValue={this.props.currentKpi.definitionField.get('problems')||''}
          /> 
        </Grid>
        <Grid item xs={4}>
        <DefinitionCard 
              key1='cost'
              name='Production Cost'
              handleChange={this.props.handleChange}
              text="What is the cost of implementing and producing the KPI?"
              purposeValue={this.props.currentKpi.definitionField.get('cost')||''}
          /> 
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(DefinitionCards);
