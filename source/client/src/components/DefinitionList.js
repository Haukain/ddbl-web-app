import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@material-ui/core';

class DefinitionList extends React.Component {

  generateKpiList() {
    let kpiList = []
    for(let [i,k] of this.props.listKpis.entries())
    {
        kpiList.push(
          <ListItem key={i} button selected={this.props.kpiSelected === i} onClick={() => this.props.updateSelected(i)}>
            <ListItemText
              primary={k.name}
            />
            {this.props.listKpis[i].defined === 1 ? (
            <Typography align='right' color="textSecondary">
              Partially defined
            </Typography>
            ): this.props.listKpis[i].defined === 2 ? (
            <Typography align='right' color="textSecondary">
              Defined
            </Typography>  
            ):(
            <Typography align='right' color="textSecondary">
              Undefined
            </Typography> 
            )}
          </ListItem>,
        )
    }
    return kpiList
}

  render() {
    return (
        <List>
            {this.generateKpiList()}
          </List>
    );
  }
}

export default DefinitionList;