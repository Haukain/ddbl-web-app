import React from 'react';
import { withStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Grid, ListItemIcon, Checkbox, Typography, IconButton, Button } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DefinitionList from './DefinitionList';
import DefinitionCard from './DefinitionCard';
import update from 'immutability-helper'

const styles = theme => ({
  list: {
    'margin-top': 25,
    'margin-right': 25,
    'float' : 'left',
     width : '25%',
     height : 700,
     overflow: 'auto', 
  },
  container: {
    marginTop: 25,
    width : '70%',
    'float': 'left'
  },
  button: {
    'float' : 'right',
  }
});

var kpiList = [
  "Market price comparator, by product", 
  "Weighted market price comparator, by product",
  "Percentage of required certificates presented",
  "Percentage of self-certification checked",
  "Total procurement admin cos",
  "Audit fail percentage",
  "Process losses caused by supplied materials",
  "Quality defects identified during production",
  "Total cost of supplier quality issues",
  "Number of outstanding disputes",
  "Number of quality issues identified in deliveries",
  "Number of outstanding quality complaint",
  "Value of outstanding quality complaints",
  "Number of chase ups from suppliers for payment",
  "Number of suppliers who will not deal with us",
  "Average days payment deviation from the agreed terms"
]

class DefinitionBoard extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      KpiList : kpiList,
      kpiSelected: null
    }
    this.updateSelected = this.updateSelected.bind(this);
  }

  updateSelected(selectedIndex) {
    this.setState({kpiSelected: update(this.state.kpiSelected, {$set: selectedIndex})});
  }

  render() {
    const { classes } = this.props;

    return (
      <div >
        <div className={classes.list}>
          <DefinitionList ListKpis={this.state} updateSelected={this.updateSelected}/>
        </div>
        {this.state.kpiSelected != null ? (
        <div className={classes.container} >
          <DefinitionCard />
          <Grid item xs={12}>
            <Button variant='contained' className={classes.button} color='primary' >SAVE</Button>
          </Grid>
        </div>
        ):(<Typography variant='h2' gutterBottom align='center'>Please choose a KPI</Typography>)}
      </div>
    );
  }
}

export default withStyles(styles)(DefinitionBoard);