import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@material-ui/core';

class DefinitionList extends React.Component {

  generateKpiList() {
    let kpiList = []
    for(let [i,k] of this.props.listKpis.entries())
    {
        kpiList.push(
          <ListItem button selected={this.props.kpiSelected === i} onClick={() => this.props.updateSelected(i)}>
            <ListItemText
              primary={k.name}
            />
            {this.props.listKpis[i].defined ? (
            <Typography color="textSecondary">
                Defined
            </Typography>
            ):(null)}
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
