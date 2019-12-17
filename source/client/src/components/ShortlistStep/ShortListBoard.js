import React from 'react';
import { withStyles } from '@material-ui/styles';
import ShortListBoardTarget from './ShortListBoardTarget';
import ShortListBoardList from './ShortListBoardList';
import { Grid, Button } from '@material-ui/core';
import update from 'immutability-helper';
import Api from '../../utils/Api';

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
    let kpisToInsert = [];
    const companyId = 1;
    const userId = 1;
    Api.get(`/kpi/${companyId}/${userId}`)
    .then( data => {
      // eslint-disable-next-line
      for(let k of data){
        let positionX = k.easeOfMeasure!=null?(k.easeOfMeasure-5)*boardWidth/10:0
        let positionY = k.importance!=null?-(k.importance-5)*boardHeight/10:0
        kpisToInsert.push(
          {
            id : k.id,
            name : k.name,
            hidden : k.status>0?false:true,
            hovered : false,
            position : {x: positionX, y: positionY}
          }
        )
      }
      this.setState({kpis:kpisToInsert})
    })
    .catch(error => {
      console.error(error);
      this.props.openSnackbar('An error ocurred while loading the KPIs', true);
    })
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
    let enabledKpis = this.state.kpis.filter(e => !e.hidden)
    let kpisToSave = []
    // eslint-disable-next-line
    for(let k of enabledKpis){
      let easeOfMeasure = (5 + (k.position.x*10)/boardWidth).toPrecision(2)
      let importance = (5 - (k.position.y*10)/boardHeight).toPrecision(2)
      let shortlisted = (easeOfMeasure>=5)&&(importance>=5)?true:false
      kpisToSave.push(
          {
            kpiId:k.id,
            shortlisted: shortlisted,
            score : {
              easeOfMeasure: easeOfMeasure,
              importance: importance
            }
          }
      )
    }

    let jsonPayload = JSON.stringify({
        companyId: "1",
        userId: "1",
        kpisToSave
    })

    Api.post('/kpi/shortlist',jsonPayload)
    .then(
      data => {
        console.log(data)
        this.props.openSnackbar(
          `${data.length} KPI(s) have been saved`,
          false
        );
      }
    )
    .catch(error => {
      console.error(error);
      this.props.openSnackbar('An error ocurred while loading the KPIs', true);
    })
  }

  render() {
    const { classes } = this.props;

    return (
        <div>
            <div className={classes.list}>
              <ShortListBoardList items={this.state.kpis}
              addHandler={this.addHandler}
              deleteHandler={this.deleteHandler}
              hoverHandler={this.hoverHandler}/>
            </div>
            <div>
              <ShortListBoardTarget boardWidth={boardWidth} boardHeight={boardHeight} tokenSize={tokenSize} items={this.state.kpis} positionHandler={this.positionHandler}/>
            </div>
            <Grid item xs={12} className={classes.buttonRow}>
              <Button variant='contained' color='primary' onClick={this.saveHandler}>save</Button>
            </Grid>
        </div>
    );
  }
}

export default withStyles(styles)(ShortListBoard);