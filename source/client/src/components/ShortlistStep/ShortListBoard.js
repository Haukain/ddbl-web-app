import React from 'react';
import { withStyles } from '@material-ui/styles';
import ShortListBoardTarget from './ShortListBoardTarget';
import ShortListBoardList from './ShortListBoardList';
import { Grid, Button, TextField } from '@material-ui/core';
import update from 'immutability-helper';
import Api from '../../utils/Api';

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
    list: {
      marginRight: 25,
      float: 'left',
      width: '25%',
      overflow: 'auto'
    },
    commentDiv : {
      float:'right',
      width: 250, 
      height : 400
    },
  });
/**
 * This is the class containing all the elements visible below the app bar
 */
class ShortListBoard extends React.Component {
  /**
   * @ignore
   */
  constructor(props) {
    super(props);
    /**
     * State containing the list of shortlisted kpis and the index of the kpi selected in the list (no kpi selected by default)
     */
    this.state = {
        kpis :
          [
          ],
        selected : null
    }

    this.positionHandler = this.positionHandler.bind(this)
    this.addHandler = this.addHandler.bind(this)
    this.deleteHandler = this.deleteHandler.bind(this)
    this.hoverHandler = this.hoverHandler.bind(this)
    this.saveHandler = this.saveHandler.bind(this)
    this.selectKpi = this.selectKpi.bind(this)
    this.commentHandler = this.commentHandler.bind(this)
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
      // eslint-disable-next-line
      data.sort((a, b) => (a.id > b.id) ? 1 : -1)
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
   * Function getting the kpi position on the board
   * @param {number} id - This is the kpi id
   */
  positionHandler(id,ui) {
    let {x, y} = this.state.kpis[id].position;
    this.setState({kpis : update(this.state.kpis, {[id]: {position: {$set: {x:(x + ui.deltaX),y:(y + ui.deltaY)}}}})});
  }
  /**
   * Function which enable to add a kpi on the board (a token is displayed)
   * @param {number} id - This is the kpi id
   */
  addHandler(id) {
    this.setState({kpis : update(this.state.kpis, {[id]: {hidden: {$set: false}}})});
  }
  /**
   * Function which enable to delete a kpi on the board
   * @param {number} id - This is the kpi id
   */
  deleteHandler(id) {
    this.setState({kpis : update(this.state.kpis, {[id]: {hidden: {$set: true}}})});
  }
  /**
   * Function which detect the kpi hovered on the board
   * @param {number} id - This is the kpi id
   * @param {boolean} hover - The value is 'true' when a kpi is hovered 
   */
  hoverHandler(id,hover) {
    this.setState({kpis : update(this.state.kpis, {[id]: {hovered: {$set: hover}}})});
  }
  /**
   * Function which identify the selected kpi
   * @param {number} - This the kpi id
   */
  selectKpi(id) {
    this.setState({selected : update(this.state.selected, {$set: id})});
  }
  /**
   * Function detecting and saving every change in the comment field
   * @param {number} id - This is the kpi id
   * @param {Object} event - This is the event contaning text entered in the comment field
   */
  commentHandler(id,e){
    this.setState({kpis : update(this.state.kpis, {[id]: {comment: {$set: e.target.value}}})});
  }
  /**
   * Function displaying the comment field
   * @param {number} id - This is the kpi id
   */
  generateComment(id){
    let comment =[]
    comment.push(
      <div>
        {(this.state.kpis[id] !== undefined) ? (
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
        </div>
    )
    return comment
  }
  /**
   * Function saving all kpis position on the board in the database
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
  /**
   * @ignore
   */
  render() {
    const { classes } = this.props;
    return (
        <div>
            <div className={classes.list}>
              <ShortListBoardList items={this.state.kpis}
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

export default withStyles(styles)(ShortListBoard);