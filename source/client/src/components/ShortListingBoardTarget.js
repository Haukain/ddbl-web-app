import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Draggable from 'react-draggable';
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  targetRoot : {
    position: 'relative',
    height : 500,
    width : 800,
  },
  targetCell : {
    float : 'left',
    width : '50%',
    height : '50%'
  },
  cell00 : {
    display: 'inline-block',
    backgroundColor : '#FFFC85'
  },
  cell01 : {
    display: 'inline-block',
    backgroundColor : '#8BFF79'
  },
  cell10 : {
    display: 'inline-block',
    backgroundColor : '#FF7F8C'
  },
  cell11 : {
    display: 'inline-block',
    backgroundColor : '#FFFC85'
  },
  targetToken : {
    position: 'absolute',
    borderRadius : 2020,
    backgroundColor : '#FF3A44',
    height : 30,
    width : 30
  },
  targetTokenText : {
    textAlign : 'center',
    color : 'white'
  },
  hidden : {
    display : 'none'
  },
  hovered : {
    backgroundColor : 'blue',
  }
}));

function generateTargetTokens(classes,items,positionHandler) {

  let targetTokens = []
  for (let i =0; i<items.length; i++) {
    targetTokens.push(
        <Draggable key={i} onDrag={(_,ui) => positionHandler(i,ui)} bounds='parent'>
          <div className={clsx(classes.targetToken,items[i].hidden && classes.hidden,items[i].hovered && classes.hovered)}>
            <div className={classes.targetTokenText}>{i+1}</div>
          </div>
        </Draggable>
      )
  }
  return targetTokens
}

export default function ShortListingBoardTarget(props) {
  const classes = useStyles();

  return (
    <div className={classes.targetRoot}>
      <div className={clsx(classes.targetCell,classes.cell00)}>
      </div>
      <div className={clsx(classes.targetCell,classes.cell01)}>
      </div>
      <div className={clsx(classes.targetCell,classes.cell10)}>
      </div>
      <div className={clsx(classes.targetCell,classes.cell11)}>
      </div>
      {generateTargetTokens(classes,props.items,props.positionHandler)}
    </div>
    // <div className="box" style={{height: '500px', width: '500px', position: 'relative', overflow: 'auto', padding: '0'}}>
    //       <div style={{height: '1000px', width: '1000px', padding: '10px'}}>
    //         <Draggable bounds="parent">
    //           <div className="box">
    //             I can only be moved within my offsetParent.<br /><br />
    //             Both parent padding and child margin work properly.
    //           </div>
    //         </Draggable>
    //         <Draggable bounds="parent">
    //           <div className="box">
    //             I also can only be moved within my offsetParent.<br /><br />
    //             Both parent padding and child margin work properly.
    //           </div>
    //         </Draggable>
    //       </div>
    //     </div>
  );
}