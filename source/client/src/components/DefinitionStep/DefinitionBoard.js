import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DefinitionList from './DefinitionList';
import DefinitionCards from './DefinitionCards';
import update from 'immutability-helper';
import Api from '../../utils/Api';
import utils from '../../utils/utils'
import Fab from '@material-ui/core/Fab';

const styles = theme => ({
  form: {
    paddingTop: theme.spacing(1)
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

class DefinitionBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      kpiList: [],
      selectedKpi: null
    };

    this.updateSelected = this.updateSelected.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
  }

  componentDidMount() {
    let kpisToInsert = [];
    let companyId=1;
    let userId=1;
    Api.get(`/kpi/${companyId}/${userId}/`)
    .then(data => {
      // eslint-disable-next-line
      let shortlistedKpis = data.filter(k => k.status>=2)
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

  updateSelected(selectedIndex) {
    this.setState({
      selectedKpi: update(this.state.selectedKpi, { $set: selectedIndex })
    });
  }

  handleChange = (e, i, n) => {
    let newValue = e.target.value===''?null:e.target.value
    this.setState({
      kpiList: update(this.state.kpiList, {
        [i]: { definitionField: { [n]: { $set: newValue } } }
      })
    });
  };

  saveHandler() {
    let kpiToSave = this.state.kpiList[this.state.selectedKpi];

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
          [this.state.selectedKpi]:  { $set: updatedKpi }
        })
      })
      this.props.openSnackbar('KPI definition saved');
    })
    .catch(err=>{
      console.error(err)
      this.props.openSnackbar('An error ocurred while saving this KPI definition', true);
    })

    
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.list}>
          <DefinitionList
            kpiList={this.state.kpiList.map(k => ({name:k.name,defined:k.defined}))}
            selectedKpi={this.state.selectedKpi}
            updateSelected={this.updateSelected}
          />
        </div>
        <div className={classes.form}>
          {this.state.selectedKpi !== null ? (
            <div className={classes.gridContainer}>
              <DefinitionCards
                kpiList={this.state.kpiList[this.state.selectedKpi]}
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
