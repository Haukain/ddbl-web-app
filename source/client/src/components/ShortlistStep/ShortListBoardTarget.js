import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Draggable from 'react-draggable';
import clsx from 'clsx';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

/**
 * @ignore
 */
const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.grey[100],
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: `1px solid ${theme.palette.grey[700]}`,
  },
}))(Tooltip);

/**
 * TODO
 */
function generateTargetTokens(classes,items,positionHandler,boardWidth,boardHeight,tokenSize) {
  let targetTokens = []
  // eslint-disable-next-line
  for (let [i,k] of items.entries()) {
    targetTokens.push(
      <Draggable key={i} onDrag={(_,ui) => positionHandler(i,ui)} bounds='parent' defaultPosition={{x: boardWidth/2 - tokenSize/2 + k.position.x, y: boardHeight/2 - tokenSize/2 + k.position.y}}>
        <HtmlTooltip enterDelay={500}
          title={
            <React.Fragment>
              <Typography color="inherit">{k.name}</Typography>
            </React.Fragment>
          }
        >
          <div className={clsx(classes.targetToken,items[i].hidden && classes.hidden,items[i].hovered && classes.hovered)}>
            <p className={classes.targetTokenText}>{k.id}</p>
          </div>
        </HtmlTooltip>
       </Draggable>
      )
  }
  return targetTokens
}

/**
 * TODO
 */
export default function ShortListBoardTarget(props) {

  const useStyles = makeStyles(theme => ({
    targetRoot : {
      position: 'relative',
      display: 'grid',
      width : props.boardWidth,
      height : props.boardHeight,
      gridTemplateColumns : `400px 400px`,
      backgroundImage: `url('/content/images/shortlisting_background.png')`
    },
  
    targetToken : {
      position: 'absolute',
      backgroundColor : theme.palette.primary.main,
      height : props.tokenSize,
      width : props.tokenSize,
      '&:hover':{
        backgroundColor: theme.palette.primary.dark,
        cursor: 'pointer'
      },
      '&:active':{
        backgroundColor: theme.palette.primary.dark,
        cursor: 'grabbing'
      }
    },
    targetTokenText : {
      textAlign : 'center',
      marginTop: '20%',
      color : 'white'
    },
    hidden : {
      display : 'none'
    },
    hovered : {
      backgroundColor : theme.palette.primary.dark,
    }
  }));

  const classes = useStyles();

  return (
    <div className={classes.targetRoot}>
        
        {generateTargetTokens(classes,props.items,props.positionHandler,props.boardWidth,props.boardHeight,props.tokenSize)}
    </div>
    
  );
}