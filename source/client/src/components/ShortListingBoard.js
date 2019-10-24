import React from 'react';
import update from 'immutability-helper';
import { withStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Draggable from 'react-draggable';
import { Container, Grid } from '@material-ui/core';
import DragIndicator from '@material-ui/icons/DragIndicator';
import ShortListingBoardTarget from './ShortListingBoardTarget';

const styles = theme => ({
    list: {
      padding :0,
      border : '1px black solid'
    },
    element: {
      display: 'flex',
      textAlign: 'center',
      border : '1px black solid',
      backgroundColor : 'white',
    },
    target: {
      height : '100%'
    }
  });

class ShortListingBoard extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
        body : null,
        elements :
          [
            {name:"kpi1",position:{x:0,y:0}},
            {name:"kpi2",position:{x:0,y:0}},
            {name:"kpi3",position:{x:0,y:0}}
          ]
    }

    this.listRef = React.createRef();
    this.targetRef = React.createRef();
  }

  onDragHandler = (e, position,id) => {
    const {x, y} = position;
    this.setState({elements : update(this.state.elements, {[id]: {position: {$set: {x,y}}}})});
  };

  onStopHandler = (id) => {
    const list = this.listRef.current;
    console.log(this.targetRef.current)
    const target = this.targetRef.current;
    let elementOffset = ((list.offsetTop+list.offsetHeight)/this.state.elements.length) * id
    const tartgetLeftCondition = (this.state.elements[id].position.x + list.offsetLeft)<target.offsetLeft
    const targetRightCondition = (this.state.elements[id].position.x + list.offsetLeft)>(target.offsetLeft + target.offsetWidth)
    const tartgetTopCondition = (this.state.elements[id].position.y + list.offsetTop + elementOffset)<target.offsetTop
    const targetBottomCondition = (this.state.elements[id].position.y + list.offsetTop + elementOffset)>(target.offsetTop + target.offsetHeight)
    if( (tartgetLeftCondition || targetRightCondition) || (tartgetTopCondition || targetBottomCondition)) {
      this.setState({elements : update(this.state.elements, {[id]: {position: {$set: {x:0,y:0}}}})});
    }
  };

  generateListElements() {
    const { classes } = this.props;

    let elementList = []
    for(let [i,e] of this.state.elements.entries()) {
      elementList.push(
        <Draggable position={e.position} onDrag={(e,p) => this.onDragHandler(e,p,i)} onStop={(e,p) => this.onStopHandler(i)}>
            <div className={classes.element}>
                <DragIndicator></DragIndicator>
                <ListItemText primary={e.name}/>
            </div>
        </Draggable>
      )
    }
    return elementList
  }

  render() {
    const { classes } = this.props;

    return (
        <Container>
          <Grid container>
            <Grid item xs={2} className={classes.gridItem}>
                <List ref={this.listRef} className={classes.list}>
                  {this.generateListElements()}
                </List>
            </Grid>
            <Grid item xs={8} className={classes.gridItem}>
              <div ref={this.targetRef} className={classes.target}>
                <ShortListingBoardTarget/>
              </div>
            </Grid>
          </Grid>
        </Container>
    );
  }
}

export default withStyles(styles)(ShortListingBoard);