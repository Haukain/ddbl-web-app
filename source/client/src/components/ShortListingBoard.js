import React from 'react';
import { withStyles } from '@material-ui/styles';
import ShortListingBoardTarget from './ShortListingBoardTarget';
import ShortListingBoardList from './ShortListingBoardList';
import { Grid } from '@material-ui/core';
import update from 'immutability-helper'

const styles = theme => ({
  });

class ShortListingBoard extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
        kpis :
          [
            {
              name : "Kpi Name 1",
              hidden : true,
              hovered : false,
              position : {x: 0, y:0}
            },
            {
              name : "Kpi Name 2",
              hidden : true,
              hovered : false,
              position : {x: 0, y:0}
            },
            {
              name : "Kpi Name 3",
              hidden : true,
              hovered : false,
              position : {x: 0, y:0}
            },
            {
              name : "Kpi Name 4",
              hidden : true,
              hovered : false,
              position : {x: 0, y:0}
            },
            {
              name : "Kpi Name 5",
              hidden : true,
              hovered : false,
              position : {x: 0, y:0}
            },
            {
              name : "Kpi Name 6",
              hidden : true,
              hovered : false,
              position : {x: 0, y:0}
            },
            {
              name : "Kpi Name 7",
              hidden : true,
              hovered : false,
              position : {x: 0, y:0}
            }
          ]
    }

    this.positionHandler = this.positionHandler.bind(this)
    this.addHandler = this.addHandler.bind(this)
    this.deleteHandler = this.deleteHandler.bind(this)
    this.hoverHandler = this.hoverHandler.bind(this)
  }

  positionHandler(id,ui) {
    let {x, y} = this.state.kpis[id].position;
    this.setState({kpis : update(this.state.kpis, {[id]: {position: {$set: {x:(x + ui.deltaX),y:(y + ui.deltaY)}}}})});
    //console.log(this.state.kpis[id].position)
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

  render() {
    const { classes } = this.props;

    return (
        <div>
          <Grid container>
            <Grid item>
              <ShortListingBoardList items={this.state.kpis.map(e => e.name)}
              addHandler={this.addHandler}
              deleteHandler={this.deleteHandler}
              hoverHandler={this.hoverHandler}/>
            </Grid>
            <Grid item>
              <ShortListingBoardTarget items={this.state.kpis.map(e => ({hidden:e.hidden,hovered:e.hovered}))} positionHandler={this.positionHandler}/>
            </Grid>
          </Grid>
        </div>
    );
  }
}

export default withStyles(styles)(ShortListingBoard);