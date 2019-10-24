import React from 'react';
import { withStyles } from '@material-ui/styles';
import ShortListingBoardTarget from './ShortListingBoardTarget';
import ShortListingBoardList from './ShortListingBoardList';
<<<<<<< HEAD
import { Grid, Button } from '@material-ui/core';
import update from 'immutability-helper';
import kpiListJSON from "../test/resources/kpiList.json"; 

const styles = theme => ({
    buttonRow : {
      textAlign : 'right'
    }
=======
import { Grid } from '@material-ui/core';
import update from 'immutability-helper'

const styles = theme => ({
>>>>>>> Better implementation
  });

const kpiList = kpiListJSON;

class ShortListingBoard extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
        kpis :
          [
          ]
    }

    this.positionHandler = this.positionHandler.bind(this)
    this.addHandler = this.addHandler.bind(this)
    this.deleteHandler = this.deleteHandler.bind(this)
    this.hoverHandler = this.hoverHandler.bind(this)
    this.saveHandler = this.saveHandler.bind(this)
  }

  componentDidMount() {
    // TODO: Remove this manual insertion
    console.log(kpiList)
    let kpisToInsert = []
    for(let i of kpiList){
      kpisToInsert.push(
        
        {
          name : i,
          hidden : true,
          hovered : false,
          position : {x: 0, y:0}
        }
      )
    }
    this.setState({kpis:kpisToInsert})
  }

  positionHandler(id,ui) {
    let {x, y} = this.state.kpis[id].position;
    this.setState({kpis : update(this.state.kpis, {[id]: {position: {$set: {x:(x + ui.deltaX),y:(y + ui.deltaY)}}}})});
  }

  addHandler(id) {
    this.setState({kpis : update(this.state.kpis, {[id]: {hidden: {$set: false}}})});
  }

  deleteHandler(id) {
    this.setState({kpis : update(this.state.kpis, {[id]: {hidden: {$set: true}}})});
  }

  hoverHandler(id,hover) {
    this.setState({kpis : update(this.state.kpis, {[id]: {hovered: {$set: hover}}})});
  }

  saveHandler() {
    let kpisToSave = this.state.kpis.filter(e => !e.hidden)
    let message = `Saving ${kpisToSave.length} KPIs to the Database`
    for(const  k of kpisToSave){
      message += `\n${k.name} : ${k.position.x},${k.position.y}`
    }
    alert(message)
  }

  render() {
    const { classes } = this.props;

    return (
        <div>
          <Grid container spacing={3}>
            <Grid item>
              <ShortListingBoardList items={this.state.kpis.map(e => e.name)}
              addHandler={this.addHandler}
              deleteHandler={this.deleteHandler}
              hoverHandler={this.hoverHandler}/>
            </Grid>
            <Grid item>
              <ShortListingBoardTarget items={this.state.kpis.map(e => ({hidden:e.hidden,hovered:e.hovered}))} positionHandler={this.positionHandler}/>
            </Grid>
            <Grid item xs={12} className={classes.buttonRow}>
              <Button variant='contained' color='primary' onClick={this.saveHandler}>save</Button>
            </Grid>
          </Grid>
        </div>
    );
  }
}

export default withStyles(styles)(ShortListingBoard);