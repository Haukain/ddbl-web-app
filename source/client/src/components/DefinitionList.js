import React from 'react';
import Parser from 'xml2js';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import { List, ListItem, ListItemText, ListItemIcon, Checkbox, Typography, IconButton } from '@material-ui/core';
import { FixedSizeList } from 'react-window';
import update from 'immutability-helper';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      height: 600,
      maxWidth: 250,
      backgroundColor: theme.palette.background.paper,
    },
  }));

class DefinitionList extends React.Component {
  
  constructor(props) {
    super(props);
    
  }

  generateKpiList() {
    let kpiList = []
    const { kpiSelected } = this.props.ListKpis;
    console.log(this.props.ListKpis)
    for(let [i,k] of this.props.ListKpis.KpiList.entries())
    {
        kpiList.push(
          <ListItem button selected={kpiSelected == i} onClick={() => this.props.updateSelected(i)}>
            <ListItemText
              primary={k}
            />
            <Typography color="textSecondary">
                Defined
            </Typography>
          </ListItem>,
        )
    }
    return kpiList
}

  render() {
    const { classes } = this.props;
    return (
      <div>
        <List>
            {this.generateKpiList()}
          </List>
      </div>
    );
  }
}

export default DefinitionList;
