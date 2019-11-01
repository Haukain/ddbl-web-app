import React from 'react';
import Parser from 'xml2js';
import { withStyles } from '@material-ui/styles';
import { List, ListItem, ListItemText, ListItemIcon, Checkbox, Typography, IconButton } from '@material-ui/core';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import { Button } from '@material-ui/core';
import update from 'immutability-helper';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  fileInput : {
    border : 'solid 2px lightblue'
  },
  listRoot : {
    textAlign : 'center',
    height : 400,
  },
  list : {
      overflow: 'auto',
      maxHeight: '100%',
  }
});

const LOCALSTORAGE_KEY = 'kpiList'

class LonglistXMLImport extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
        kpiList : []
    }
    this.handleChecked = this.handleChecked.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.extractSchema = this.extractSchema.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
  }

  handleChecked (id) {
    let currentState = this.state.kpiList[id].isChecked
    this.setState({kpiList : update(this.state.kpiList, {[id]: {isChecked: {$set: !currentState}}})});
  }

  handleChange(event) {
    let reader = new FileReader();
    reader.readAsText(event.target.files[0], 'UTF-8');
    reader.onload = (evt) => {
        Parser.parseString(evt.target.result, (err, result) => {
            this.extractSchema(result)
        })
    }
    reader.onerror = (evt) => {
        console.log('error reading file');
    }
  }

  extractSchema(schema){
    let kpiList = [];
    if(schema.Report['VisRpt:VisioReport'][0].ReportFields[0].ReportField.findIndex(e => e.Name[0] === 'Displayed Text')!==undefined)
    {
        let previousIndexes = schema.Report['VisRpt:VisioReport'][0].Group[0].GroupField[0].RowItem
        .reduce( 
            (a, e, i) => {
                if (e.Field[0].Val){
                    if(e.Field[0].Val[0]._ === 'KPI') a.push(i)
                }
                return a
            }
        , [])

        for(let i of previousIndexes) {
            kpiList.push({name:schema.Report['VisRpt:VisioReport'][0].Group[0].GroupField[0].RowItem[i+1].Field[0].Val[0]._,isChecked:true})
        }
        this.setState({kpiList:kpiList})
    }
    else (console.error('Error while extracting schema from the XML file'))
  }

  generateKpiList() {
      let kpiList = []
      for(let [i,k] of this.state.kpiList.entries())
      {
          kpiList.push(
            <ListItem>
              <ListItemText
                primary={k.name}
              />
              <ListItemIcon>
                <Checkbox
                  disableRipple
                  onChange={ () => this.handleChecked(i) }
                  checked={k.isChecked}
                />
              </ListItemIcon>
            </ListItem>,
          )
      }
      return kpiList
  }

  saveHandler() {
    let kpis =[]
    let kpisToSave = this.state.kpiList
    let message = `Saving ${kpisToSave.filter(e=>e.isChecked).length} KPIs to the Database`
    for(const  k of kpisToSave.filter(e=>e.isChecked)){
      message += `\n ${k.name}`
      kpis.push(k.name)
    }
    alert(message)

    window.localStorage.setItem(
      LOCALSTORAGE_KEY,
      JSON.stringify(kpis)
    )

    let path = `/shortlisting`;
    this.props.history.push(path);
  }

  render() {
    const { classes } = this.props;
    
    return (
      <div className={classes.listRoot}>
          <Typography variant='h2' gutterBottom>
            {this.state.kpiList.length!=0?this.state.kpiList.length+' KPIs found':'Please import a file'}
          </Typography>
          <input
            hidden
            type='file'
            accept='.xml'
            id='file-input'
            onChange={this.handleChange}
            variant='contained' color='primary'
          />
          <label htmlFor='file-input'>
            <IconButton component='span' className={classes.fileInput}
          color="primary">
              <NoteAddIcon/>
            </IconButton>
          </label>
          <List className={classes.list}>
            {this.generateKpiList()}
          </List>
          <Button variant='contained' disabled={this.state.kpiList.length==0} color='primary' onClick={this.saveHandler}>save</Button>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(LonglistXMLImport));