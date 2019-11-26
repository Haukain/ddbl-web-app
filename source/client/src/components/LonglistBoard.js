import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Typography
} from '@material-ui/core';
import { Button } from '@material-ui/core';
import update from 'immutability-helper';
import LonglistXMLImport from './LonglistXMLImport';
import LonglistManualImport from './LonglistManualImport';
import Api from '../utils/Api';

const styles = theme => ({
  listRoot: {
    textAlign: 'center'
  },
  list: {
    overflow: 'auto',
    maxHeight: 400,
    marginBottom: theme.spacing(2)
  }
});

class LonglistBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      kpiList: []
    };
    this.handleChecked = this.handleChecked.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
    this.importKpis = this.importKpis.bind(this);
    this.addKpis = this.addKpis.bind(this);
  }

  handleChecked(id) {
    let currentState = this.state.kpiList[id].isChecked;
    this.setState({
      kpiList: update(this.state.kpiList, {
        [id]: { isChecked: { $set: !currentState } }
      })
    });
  }

  generateKpiList() {
    let kpiList = [];
    for (let [i, k] of this.state.kpiList.entries()) {
      kpiList.push(
        <ListItem key={i}>
          <ListItemText primary={k.name} />
          <ListItemIcon>
            <Checkbox
              disableRipple
              onChange={() => this.handleChecked(i)}
              checked={k.isChecked}
            />
          </ListItemIcon>
        </ListItem>
      );
    }
    return kpiList;
  }

  saveHandler() {
    let kpisToSave = this.state.kpiList
      .filter(e => e.isChecked)
      .map(e => ({ name: e.name }));
    let jsonPayload = JSON.stringify({
      companyId: 1,
      userId: 1,
      kpis: kpisToSave
    });

    Api.post('/kpi', jsonPayload)
      .then(success => {
        this.props.openSnackbar(
          `${success.length} KPI(s) have been saved`,
          false
        );
        this.setState({ kpiList: [] });
      })
      .catch(error => {
        console.error(error);
        this.props.openSnackbar('An error ocurred while saving the KPIs', true);
      });
  }

  importKpis(list) {
    this.setState({
      kpiList: update(this.state.kpiList, {
        $push: list.map(e => ({ name: e, isChecked: true }))
      })
    });
  }

  addKpis(name) {
    let newKpi = { name: name, isChecked: true };
    this.setState({ kpiList: update(this.state.kpiList, { $push: [newKpi] }) });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.listRoot}>
        <Typography variant='h2' gutterBottom>
          {this.state.kpiList.length !== 0
            ? this.state.kpiList.length + ' KPIs found'
            : 'Please import some KPIs'}
        </Typography>
        <Grid container spacing={10}>
          <Grid item xs={4}>
            <Typography variant='h5' gutterBottom>
              {'Add KPI manually'}
            </Typography>
            <LonglistManualImport addKpis={this.addKpis} />
          </Grid>
          <Grid item xs={4}>
            <List className={classes.list}>{this.generateKpiList()}</List>
            <Button
              variant='contained'
              disabled={this.state.kpiList.length === 0}
              color='primary'
              onClick={this.saveHandler}
            >
              save
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Typography variant='h5' gutterBottom>
              {'Import a KPI file'}
            </Typography>
            <LonglistXMLImport
              importKpis={this.importKpis}
              openSnackbar={this.props.openSnackbar}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(LonglistBoard);
