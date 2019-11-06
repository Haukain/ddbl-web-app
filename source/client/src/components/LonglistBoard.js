import React from 'react';
import Parser from 'xml2js';
import { withStyles } from '@material-ui/styles';
import { Container, Grid, List, ListItem, ListItemText, ListItemIcon, Checkbox, Typography, IconButton } from '@material-ui/core';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import { Button } from '@material-ui/core';
import update from 'immutability-helper';
import LonglistXMLImport from './LonglistXMLImport';
import LonglistManualImport from './LonglistManualImport'

const styles = theme => ({
  fileInput : {
    border : 'solid 2px lightblue'
  },
  listRoot : {
    textAlign : 'center',
    height : 400,
  },
  list : {
      height : 400,
      overflow: 'auto',
      maxHeight: '100%',
  }
});

const LOCALSTORAGE_KEY = 'kpiList'

class LonglistBoard extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
        kpiList : []
    }
    this.handleChecked = this.handleChecked.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
    this.kpiImport = this.kpiImport.bind(this);
    this.kpiAdd = this.kpiAdd.bind(this)
  }

  handleChecked (id) {
    let currentState = this.state.kpiList[id].isChecked
    this.setState({kpiList : update(this.state.kpiList, {[id]: {isChecked: {$set: !currentState}}})});
  }

  generateKpiList() {
      let kpiList = []
      console.log(this.state.kpiList)
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
    let kpisToSave = this.state.kpiList
    let message = `Saving ${kpisToSave.filter(e=>e.isChecked).length} KPIs to the Database`
    for(const  k of kpisToSave.filter(e=>e.isChecked)){
      message += `\n ${k.name}`
    }
    alert(message)

    const kpisJson = JSON.parse(JSON.stringify(kpisToSave.filter(e=>e.isChecked)))
    window.localStorage.setItem(
      LOCALSTORAGE_KEY,
      kpisJson
    )
  }

  kpiImport(list) {
    for(let i of list){
      this.setState({1:{kpiList: this.state.kpiList.push(i)}})
    }
    //this.setState({kpiList: list})
  }

  kpiAdd(name) {
    this.setState({1:{kpiList: this.state.kpiList.push(name)}})
  }

  render() {
    const { classes } = this.props;
    
    return (
        <div className={classes.listRoot}>
            <Typography variant='h2' gutterBottom>
                {this.state.kpiList.length!=0?this.state.kpiList.length+' KPIs found':'Please import a KPI'}
            </Typography>
        
            <Grid container spacing={10}>
                <Grid item key={1} xs={4}>
                    <Typography variant='h5' gutterBottom>
                        {'Add KPI manually'}
                    </Typography>
                    <LonglistManualImport addKpis={this.kpiAdd}/>
                </Grid>
                <Grid item key={1} xs={4}>
                    <List className={classes.list}>
                        {this.generateKpiList()}
                    </List>
                    <Button variant='contained' disabled={this.state.kpiList.length==0} color='primary' onClick={this.saveHandler}>save</Button>
                </Grid>
                <Grid item key={1} xs={4}>
                    <Typography variant='h5' gutterBottom>
                        {'Import a KPI file'}
                    </Typography>
                    <LonglistXMLImport importKpis={this.kpiImport}/>
                </Grid>
            </Grid>
        </div>
    );
  }
}

export default withStyles(styles)(LonglistBoard);