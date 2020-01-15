import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, TextField } from '@material-ui/core';
import DefinitionList from './DefinitionList';
import DefinitionCardsGrid from './DefinitionCardsGrid';
import update from 'immutability-helper';
import Api from '../../utils/Api';
import utils from '../../utils/utils'
import Fab from '@material-ui/core/Fab';

/**
 * @ignore
 */
const styles = theme => ({
  form: {
    paddingTop: theme.spacing(1)
  },
  search: {
    width: '100%',
  },
  list: {
    float: 'left',
    width: '25%',
    height: "650px",
    overflow: 'auto',
    marginRight: theme.spacing(2),
  },
  gridContainer: {
    float: 'left',
    width: '70%',
    height: "650px"
  },
  button: {
    left: '50%',
    margin: '1%'
  },
  saveButton: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  }
});

/**
 * TODO
 */
class DefinitionBoard extends React.Component {
  /**
   * @ignore
   */
  constructor(props) {
    super(props);
    /**
     * TODO
     */
    this.state = {
      kpiList: [],
      selectedKpi: null,
      filterKpi: ''
    };

    this.updateSelected = this.updateSelected.bind(this);
    /**
     * @ignore
     */
    this.handleChange = this.handleChange.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
    this.searchKPI = this.searchKPI.bind(this);
  }
  /**
   * @ignore
   */
  componentDidMount() {
    let kpisToInsert = [];
    let companyId=1;
    let userId=1;
    Api.get(`/kpi/${companyId}/${userId}/`)
    .then(data => {
      let shortlistedKpis = data.filter(k => k.status>=2)
      shortlistedKpis.sort((a, b) => (a.easeOfMeasure*a.importance < b.easeOfMeasure*b.importance) ? 1 : -1)
      // eslint-disable-next-line
      for(let k of shortlistedKpis){
        kpisToInsert.push({
          id:k.id,
          name:k.name,
          defined:this.getDefinitionState(k),
          definitionField: new Map([
            ['purpose', k.purpose],
            ['customers', k.customers],
            ['datasources', k.datasources],
            ['formula', k.formula],
            ['resources', k.resources],
            ['problems', k.problems],
            ['targets', k.targets],
            ['outcomes', k.outcomes],
            ['cost', k.cost]
          ])
        })
      }
      this.setState({ kpiList: kpisToInsert });
    })
    .catch(error => {
      console.error(error);
      this.props.openSnackbar('An error ocurred while loading the KPIs', true);
    });
  }
  /**
   * TODO
   */
  getDefinitionState(data) {
    let fields = [data.purpose,
      data.customers,
      data.datasources,
      data.formula,
      data.resources,
      data.problems,
      data.targets,
      data.outcomes,
      data.cost
    ]
    
    if(fields.every((e)=>e!==null)){
      return utils.KpiDefinitionState.DEFINED
    }
    else if(fields.every((e)=>e===null)){
      return utils.KpiDefinitionState.UNDEFINED
    }
    else {
      return utils.KpiDefinitionState.PARTIALLY_DEFINED
    }
  }
  /**
   * TODO
   */
  updateSelected(id) {
    this.setState({
      selectedKpi: update(this.state.selectedKpi, { $set: id })
    });
  }
  /**
   * TODO
   */
  handleChange = (e, id, n) => { 
    let i = this.state.kpiList.findIndex(k=>  k.id===this.state.selectedKpi)
    let newValue = e.target.value===''?null:e.target.value
    this.setState({
      kpiList: update(this.state.kpiList, {
        [i]: { definitionField: { [n]: { $set: newValue } } }
      })
    });
  };
  /**
   * TODO
   */
  saveHandler() {
    let i = this.state.kpiList.findIndex(k=>  k.id===this.state.selectedKpi)
    let kpiToSave = this.state.kpiList[i];

    let jsonPayload = JSON.stringify({
      companyId: "1",
      userId: "1",
      kpiId: kpiToSave.id,
      definition: {
        purpose: kpiToSave.definitionField.get('purpose'),
        customers: kpiToSave.definitionField.get('customers'),
        datasources: kpiToSave.definitionField.get('datasources'),
        formula: kpiToSave.definitionField.get('formula'),
        resources: kpiToSave.definitionField.get('resources'),
        problems: kpiToSave.definitionField.get('problems'),
        targets: kpiToSave.definitionField.get('targets'),
        outcomes: kpiToSave.definitionField.get('outcomes'),
        cost: kpiToSave.definitionField.get('cost')
      }
    })



    Api.post('/kpi/definition',jsonPayload)
    .then(data=>{
      let updatedKpi = {
        id:data.id,
        name:data.name,
        defined:this.getDefinitionState(data),
        definitionField: new Map([
          ['purpose', data.purpose],
          ['customers', data.customers],
          ['datasources', data.datasources],
          ['formula', data.formula],
          ['resources', data.resources],
          ['problems', data.problems],
          ['targets', data.targets],
          ['outcomes', data.outcomes],
          ['cost', data.cost]
        ])
      }
      this.setState({
        kpiList: update(this.state.kpiList, {
          [i]:  { $set: updatedKpi }
        })
      })
      this.props.openSnackbar('KPI definition saved');
    })
    .catch(err=>{
      console.error(err)
      this.props.openSnackbar('An error ocurred while saving this KPI definition', true);
    })   
  }


  searchKPI() {
    let val = this.myValue.value;
    this.setState({
      filterKpi:val
    })   
  }
  /**
   * @ignore
   */ 
  render() {
    const { classes } = this.props;
    return (
      
      <div>
        
        <div className={classes.list}>
          <TextField
            className={classes.search}
            id="filled-search" 
            label="Search a KPI" 
            type="search" 
            variant="filled"
            inputRef={value => this.myValue = value}
            onChange={this.searchKPI.bind(this)}        
          />        
          <DefinitionList
            kpiList={this.state.kpiList
              .filter(k => { 
                 return k.name.toLowerCase().indexOf(this.state.filterKpi.toLowerCase())>=0
                 
               })                          
              .map(k => ({id:k.id,name:k.name,defined:k.defined}))}
            selectedKpi={this.state.selectedKpi}
            updateSelected={this.updateSelected}                         
          />
        </div>
        <div className={classes.form}>
          {this.state.selectedKpi !== null ? (
            <div className={classes.gridContainer}>
              
              <DefinitionCardsGrid
                currentKpi={this.state.kpiList[this.state.kpiList.findIndex(k => k.id===this.state.selectedKpi)] }
                handleChange={(e, name) => {
                  this.handleChange(e, this.state.selectedKpi, name); 
                }} 
                
              /> 
               
            </div>
          ) : (
            <Typography variant='h2' gutterBottom align='center'>
              Please choose a KPI
            </Typography>
          )}
        </div>
        {this.state.selectedKpi!== null && (
        <Fab color="primary" className={classes.saveButton} onClick={this.saveHandler} variant="extended">
          SAVE
        </Fab>)}
      </div>
    );
  }
}

export default withStyles(styles)(DefinitionBoard);
