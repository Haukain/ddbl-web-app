import React from 'react';
import { withStyles } from '@material-ui/styles';
import ShortListBoardTarget from './ShortListBoardTarget';
import ShortListBoardList from './ShortListBoardList';
import { Grid, Button } from '@material-ui/core';
import update from 'immutability-helper';

const boardWidth = 800;
const boardHeight = 500;
const tokenSize = 30;

const styles = theme => ({
    buttonRow : {
      textAlign : 'right'
    },
    list: {
      marginRight: 25,
      float: 'left',
      width: '25%',
      overflow: 'auto'
    }
  });

class ShortListBoard extends React.Component {
  
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
    let kpiList = [
      'test1',
      'test2',
      'test3',
      'test4',
      'test5',
      'test6',
      'test7',
      'test8',
      'test9',
      'test10',
      'test11',
    ]
    let kpisToInsert = []   
    // eslint-disable-next-line
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
    // eslint-disable-next-line
    for(const  k of kpisToSave){
      let position_x = 5 + (k.position.x*10)/boardWidth
      let position_y = 5 - (k.position.y*10)/boardHeight
      message += `\n${k.name} : ${position_x.toPrecision(2)},${position_y.toPrecision(2)}`
    }
    alert(message)
  }

  render() {
    const { classes } = this.props;

    return (
        <div>
            <div className={classes.list}>
              <ShortListBoardList items={this.state.kpis.map(e => ({name:e.name,hidden:e.hidden}))}
              addHandler={this.addHandler}
              deleteHandler={this.deleteHandler}
              hoverHandler={this.hoverHandler}/>
            </div>
            <div>
              <ShortListBoardTarget boardWidth={boardWidth} boardHeight={boardHeight} tokenSize={tokenSize} items={this.state.kpis.map(e => ({name:e.name,hidden:e.hidden,hovered:e.hovered}))} positionHandler={this.positionHandler}/>
            </div>
            <Grid item xs={12} className={classes.buttonRow}>
              <Button variant='contained' color='primary' onClick={this.saveHandler}>save</Button>
            </Grid>
        </div>
    );
  }
}

export default withStyles(styles)(ShortListBoard);