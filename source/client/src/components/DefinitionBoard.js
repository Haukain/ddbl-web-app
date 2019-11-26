import React from 'react';
import { withStyles } from '@material-ui/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import DefinitionList from './DefinitionList';
import DefinitionCard from './DefinitionCard';
import update from 'immutability-helper';
import kpiList from '../test/resources/kpiList.json';

const styles = theme => ({
  list: {
    marginRight: 25,
    float: 'left',
    width: '25%',
    overflow: 'auto'
  },
  gridContainer: {
    marginTop: 5,
    width: '70%',
    float: 'left'
  },
  button: {
    float: 'right',
    margin: '1%'
  }
});

class DefinitionBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      kpiList: [],
      kpiSelected: null
    };

    this.kpiState = {
      UNDEFINED: 0,
      PARTIALLY_DEFINED: 1,
      DEFINED: 2
    };

    this.updateSelected = this.updateSelected.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
  }

  componentDidMount() {
    // TODO: Remove this manual insertion
    let kpisToInsert = [];
    for (let i of kpiList) {
      kpisToInsert.push({
        name: i,
        defined: this.kpiState.UNDEFINED,
        definitionField: new Map([
          ['purpose', ''],
          ['customer', ''],
          ['datasource', ''],
          ['definition', ''],
          ['resources', ''],
          ['problem', ''],
          ['target', ''],
          ['outcome', ''],
          ['cost', '']
        ])
      });
    }
    this.setState({ kpiList: kpisToInsert });
  }

  updateSelected(selectedIndex) {
    this.setState({
      kpiSelected: update(this.state.kpiSelected, { $set: selectedIndex })
    });
  }

  handleChange = (e, i, n) => {
    this.setState({
      kpiList: update(this.state.kpiList, {
        [i]: { definitionField: { [n]: { $set: e.target.value } } }
      })
    });
  };

  saveHandler() {
    let kpisToSave = this.state.kpiList[this.state.kpiSelected];
    let message = `Saving KPI's definition to the Database
                Name : ${kpisToSave.name}
                Purpose : ${kpisToSave.definitionField.get('purpose')}
                Customer : ${kpisToSave.definitionField.get('customer')}
                Data Sources : ${kpisToSave.definitionField.get('datasource')}
                Definition or Formula : ${kpisToSave.definitionField.get(
                  'definition'
                )}
                Production Resources : ${kpisToSave.definitionField.get(
                  'resources'
                )}
                Problems & Errors : ${kpisToSave.definitionField.get('problem')}
                Targets : ${kpisToSave.definitionField.get('target')}
                Targets Outcomes : ${kpisToSave.definitionField.get('outcome')}
                Production Cost : ${kpisToSave.definitionField.get('cost')}`;
    alert(message);

    var notDefined = false;
    for (var i of kpisToSave.definitionField.values()) {
      if (i === '') {
        notDefined = true;
        break;
      }
    }

    if (notDefined === false) {
      this.setState({
        kpiList: update(this.state.kpiList, {
          [this.state.kpiSelected]: { defined: { $set: this.kpiState.DEFINED } }
        })
      });
    } else {
      this.setState({
        kpiList: update(this.state.kpiList, {
          [this.state.kpiSelected]: {
            defined: { $set: this.kpiState.PARTIALLY_DEFINED }
          }
        })
      });
    }
  }

  checkEmptyDefinition() {
    var disable = true;
    for (var i of this.state.kpiList[
      this.state.kpiSelected
    ].definitionField.values()) {
      if (i !== '') {
        disable = false;
        break;
      }
    }
    return disable;
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.list}>
          <DefinitionList
            listKpis={this.state.kpiList}
            kpiSelected={this.state.kpiSelected}
            updateSelected={this.updateSelected}
          />
        </div>
        <div>
          {this.state.kpiSelected !== null ? (
            <div className={classes.gridContainer}>
              <DefinitionCard
                listKpis={this.state.kpiList[this.state.kpiSelected]}
                kpiSelected={this.state.kpiSelected}
                handleChange={(e, name) => {
                  this.handleChange(e, this.state.kpiSelected, name);
                }}
              />
              <Grid item xs={12}>
                <Button
                  variant='contained'
                  className={classes.button}
                  disabled={this.checkEmptyDefinition()}
                  onClick={this.saveHandler}
                  color='primary'
                >
                  SAVE
                </Button>
              </Grid>
            </div>
          ) : (
            <Typography variant='h2' gutterBottom align='center'>
              Please choose a KPI
            </Typography>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(DefinitionBoard);
