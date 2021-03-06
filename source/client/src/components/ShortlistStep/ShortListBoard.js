import React from 'react';
import { withStyles } from '@material-ui/styles';
import ShortListBoardTarget from './ShortListBoardTarget';
import ShortListBoardList from './ShortListBoardList';
import { Grid, Button, TextField } from '@material-ui/core';
import update from 'immutability-helper';
import Api from '../../utils/Api';
import { withRouter } from "react-router";

/**
 * @ignore
 */
const boardWidth = 800;
/**
 * @ignore
 */
const boardHeight = 500;
/**
 * @ignore
 */
const tokenSize = 30;

/**
 * @ignore
 */
const styles = theme => ({
    buttonRow : {
      textAlign : 'right'
    },
    search: {
      width: '100%',
    },
    list: {
      marginRight: 25,
      float: 'left',
      width: '300px',
      overflow: 'auto',
      height : 500,
    },
    commentDiv : {
      float:'right',
      width: 250, 
      height : 400
    },
  });
/**
 * TODO
 */
class ShortListBoard extends React.Component {
  /**
   * @ignore
   */
  constructor(props) {
    super(props);
    /**
     * TODO
     */
    this.state = {
        kpis :
          [
          ],
        selected : null,
        filterKpi: ''
    }

    this.positionHandler = this.positionHandler.bind(this)
    this.addHandler = this.addHandler.bind(this)
    this.deleteHandler = this.deleteHandler.bind(this)
    this.hoverHandler = this.hoverHandler.bind(this)
    this.saveHandler = this.saveHandler.bind(this)
    this.selectKpi = this.selectKpi.bind(this)
    this.commentHandler = this.commentHandler.bind(this)
    this.searchKPI = this.searchKPI.bind(this)
  }
  /**
   * @ignore
   */
  componentDidMount() { 
    let kpisToInsert = [];
    const companyId = 1;
    const userId = 1;
    Api.get(`/kpi/${companyId}/${userId}`)
    .then( data => {
      data.sort((a, b) => (a.id > b.id) ? 1 : -1)
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
            position : {x: positionX, y: positionY},
            comment : k.comment
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
  /**
   * TODO
   */
  positionHandler(id,ui) {
    let index = this.state.kpis.findIndex(k => k.id === id)
    let {x, y} = this.state.kpis[index].position;
    this.setState({kpis : update(this.state.kpis, {[index]: {position: {$set: {x:(x + ui.deltaX),y:(y + ui.deltaY)}}}})});
  }
  /**
   * TODO
   */
  addHandler(id) {
    let index = this.state.kpis.findIndex(k => k.id === id)
    this.setState({kpis : update(this.state.kpis, {[index]: {hidden: {$set: false}}})});
  }
  /**
   * TODO
   */
  deleteHandler(id) {
    let index = this.state.kpis.findIndex(k => k.id === id)
    this.setState({kpis : update(this.state.kpis, {[index]: {hidden: {$set: true}}})});
  }
  /**
   * TODO
   */
  hoverHandler(id,hover) {
    let index = this.state.kpis.findIndex(k => k.id === id)
    this.setState({kpis : update(this.state.kpis, {[index]: {hovered: {$set: hover}}})});
  }
  /**
   * TODO
   */
  selectKpi(id) {
    let index = this.state.kpis.findIndex(k => k.id === id)
    this.setState({selected : update(this.state.selected, {$set: (index)})});
  }
  /**
   * TODO
   */
  commentHandler(id,e){
    this.setState({kpis : update(this.state.kpis, {[id]: {comment: {$set: e.target.value}}})});
  }
  /**
   * TODO
   */
  generateComment(id){
    return (<div>
      {(this.state.kpis[id]!== undefined) ? (
        <div>
          <p>{this.state.kpis[id].name}</p>
          <TextField 
          multiline
          rows="4"
          rowsMax="15"
          label= "Enter a comment"
          variant="outlined" 
          value={(id !== null)&&(this.state.kpis[id].comment!==null) ? (this.state.kpis[id].comment) : ("") }
          onChange={e=> this.commentHandler(id,e)}
          />
        </div>
        ):(null)}
      </div>)
  }
  /**
   * TODO
   */
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
            },
            comment:k.comment
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
        this.props.openSnackbar(
          `${data.length} KPI(s) have been saved`,
          false
        );
        this.props.history.push(`/definition`);
      }
    )
    .catch(error => {
      console.error(error);
      this.props.openSnackbar('An error ocurred while loading the KPIs', true);
    })
  }

  /**
   * @ignore
   */
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
                id="filled-search" 
                label="Search a KPI" 
                type="search" 
                variant="filled"
                inputRef={value => this.myValue = value}
                onChange={this.searchKPI.bind(this)}
                className={classes.search}      
              />
              <ShortListBoardList 
                items={this.state.kpis                  
                  .filter(k => {  
                   return k.name.toLowerCase().indexOf(this.state.filterKpi.toLowerCase())>=0
                  })
                  
                }
                addHandler={this.addHandler}
                deleteHandler={this.deleteHandler}
                hoverHandler={this.hoverHandler}
                selectKpi={this.selectKpi}/>
            </div>
            <div>
              <div className={classes.commentDiv}>
                  {this.generateComment(this.state.selected)}
              </div>
              <ShortListBoardTarget boardWidth={boardWidth} boardHeight={boardHeight} tokenSize={tokenSize} items={this.state.kpis} positionHandler={this.positionHandler}/>
            </div>
            <Grid item xs={12} className={classes.buttonRow}>
              <Button variant='contained' color='primary' onClick={this.saveHandler}>save</Button>
            </Grid>
        </div>
    );
  }
}

export default withStyles(styles)(withRouter(ShortListBoard));