import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Draggable from 'react-draggable';
import clsx from 'clsx';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  targetRoot : {
    position: 'relative',
    display: 'grid',
    height : 500,
    width : 800,
    gridTemplateColumns : `400px 400px`,
  },

  cell00 : {
    backgroundColor : '#FFFC85'
  },
  cell01 : {
    backgroundColor : '#8BFF79'
  },
  cell10 : {
    backgroundColor : '#FF7F8C'
  },
  cell11 : {
    backgroundColor : '#FFFC85'
  },
  targetToken : {
    position: 'absolute',
    //borderRadius : 2020,
    backgroundColor : '#FF3A44',
    height : 30,
    width : 30,
    '&:hover,&:active':{
      backgroundColor: 'blue'
    }
  },
  targetTokenText : {
    textAlign : 'center',
    marginTop: '25%',
    color : 'white'
  },
  hidden : {
    display : 'none'
  },
  hovered : {
    backgroundColor : 'blue',
  }
}));

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);


function generateTargetTokens(classes,items,positionHandler) {
  console.log(items)
  let targetTokens = []
  for (let [i,k] of items.entries()) {
    targetTokens.push(
      <Draggable key={i} onDrag={(_,ui) => positionHandler(i,ui)} bounds='parent'>
        <HtmlTooltip enterDelay={500}
          title={
            <React.Fragment>
              <Typography color="inherit">{k.name}</Typography>
            </React.Fragment>
          }
        >
          <div className={clsx(classes.targetToken,items[i].hidden && classes.hidden,items[i].hovered && classes.hovered)}>
            <p className={classes.targetTokenText}>{i+1}</p>
          </div>
        </HtmlTooltip>
       </Draggable>
      )
  }
  return targetTokens
}

export default function ShortListBoardTarget(props) {
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
    
  );
}