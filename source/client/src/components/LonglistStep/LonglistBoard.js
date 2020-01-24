import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Typography,
  ListSubheader,
  FormControlLabel,
  TextField
} from '@material-ui/core';
import { Button } from '@material-ui/core';
import update from 'immutability-helper';
import LonglistXMLImport from './LonglistXMLImport';
import LonglistManualImport from './LonglistManualImport';
import Api from '../../utils/Api';

/**
 * @ignore
 */
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

/**
 * This is the class containing all the elements visible below the app bar
 */
class LonglistBoard extends React.Component {
  /**
   * @ignore
   */
  constructor(props) {
    super(props);
    /**
     * State containing the list of imported kpis
     */
    this.state = {
      kpiList: [],
      batchCheck: true,
    };
    this.handleChecked = this.handleChecked.bind(this);
    this.handleBatchCheck = this.handleBatchCheck.bind(this);
    this.handleKpiToggleEdition = this.handleKpiToggleEdition.bind(this);
    this.handleValidateKpiEdition = this.handleValidateKpiEdition.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
    this.importKpis = this.importKpis.bind(this);
    this.addKpis = this.addKpis.bind(this);
  }
  /**
   * Function which check if a kpi is selected in the list
   * @param {number} id - This is the id of checked kpi
   */
  handleChecked(id) {
    let currentState = this.state.kpiList[id].isChecked;
    this.setState({
      kpiList: update(this.state.kpiList, {
        [id]: { isChecked: { $set: !currentState } }
      })
    });
  }
  /**
   * TODO
   */
  handleBatchCheck() {
    let newState = !this.state.batchCheck
    this.setState({batchCheck:newState})
    let kpiList = this.state.kpiList
    for(let k of kpiList){
      k.isChecked = newState
    }
    this.setState({kpiList:kpiList})
  }
  /**
   * TODO
   */
  handleKpiToggleEdition(id){
    this.setState({
      kpiList: update(this.state.kpiList, {
        [id]: { isBeingEdited: { $set: true } }
      })
    });
  }
  /**
   * TODO
   */
  handleKpiEdition(event,id){
    this.setState({
      kpiList: update(this.state.kpiList, {
        [id]: { name : { $set: event.target.value } }
      })
    });
  }
  /**
   * TODO
   */
  handleEnterValidateKpiEdition(event,id) {
    if(event.key==='Enter'){
      this.handleValidateKpiEdition(id)
    }
  }
  /**
   * TODO
   */
  handleValidateKpiEdition(id){
    this.setState({
      kpiList: update(this.state.kpiList, {
        [id]: { isBeingEdited: { $set: false } }
      })
    });
  }
  /**
   * Function which displayed a list of kpis added or imported 
   */
  generateKpiList() {
    let kpiList = [];
    // eslint-disable-next-line
    for (let [i, k] of this.state.kpiList.entries()) {
      kpiList.push(
        <ListItem key={i}>
          {k.isBeingEdited?<TextField autoFocus value={this.state.kpiList[i].name} onKeyDown={(e) => this.handleEnterValidateKpiEdition(e,i)} onChange={(e) => this.handleKpiEdition(e,i)} onBlur={() => this.handleValidateKpiEdition(i)}/>:<ListItemText primary={k.name} onDoubleClick={() => this.handleKpiToggleEdition(i)}/>}
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
  /**
   * Function saving the list of selected kpis in the database
   */
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
      .then(data => {
        this.props.openSnackbar(
          `${data.length} KPI(s) have been saved`,
          false
        );
        this.setState({ kpiList: [] });
      })
      .catch(error => {
        console.error(error);
        this.props.openSnackbar('An error ocurred while saving the KPIs', true);
      });
  }
  /**
   * Function which add imported kpis to the list
   * @param {Object} list - This is the list of imported kpis
   */
  importKpis(list) {
    this.setState({
      kpiList: update(this.state.kpiList, {
        $push: list.map(e => ({ name: e, isChecked: this.state.batchCheck, isBeingEdited : false }))
      })
    });
  }
  /**
   * Function which add a kpi entered manually 
   * @param {string} name - This is the kpi name
   */
  addKpis(name) {
    let newKpi = { name: name, isChecked: this.state.batchCheck, isBeingEdited : false };
    this.setState({ kpiList: update(this.state.kpiList, { $push: [newKpi] }) });
  }
  /**
   * @ignore
   */
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
            <List className={classes.list}>
              <ListSubheader
              disableSticky
              >
                <FormControlLabel
                  control={<Checkbox color="primary" checked={this.state.batchCheck} onClick={this.handleBatchCheck}/>}
                  label={'Check All'}
                  labelPlacement="start"
                />
              </ListSubheader>
              {this.generateKpiList()}
            </List>
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
