import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import utils from '../../utils/utils'

/**
 * TODO
 */
class DefinitionList extends React.Component {
  /**
   * TODO
   */
  generateKpiList() {
    let kpiList = [];
    // eslint-disable-next-line
    for (let [i, k] of this.props.kpiList.entries()) {
      kpiList.push(
        <ListItem
          key={i}
          button
          selected={this.props.selectedKpi === i}
          onClick={() => this.props.updateSelected(i)}
        >
          <ListItemText primary={k.name} />
          {
            this.props.kpiList[i].defined === utils.KpiDefinitionState.DEFINED ? (
              <Typography align='right' color='textSecondary'>
                Defined
              </Typography>
            ) : this.props.kpiList[i].defined === utils.KpiDefinitionState.PARTIALLY_DEFINED ? (
              <Typography align='right' color='textSecondary'>
                Partially defined
              </Typography>
            ) : (
              <Typography align='right' color='textSecondary'>
                Undefined
              </Typography>
            )
          }
        </ListItem>
      );
    }
    return kpiList;
  }
  /**
   * @ignore
   */
  render() {
    return <List>{this.generateKpiList()}</List>;
  }
}

export default DefinitionList;
