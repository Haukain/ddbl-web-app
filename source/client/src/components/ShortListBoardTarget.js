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
    backgroundImage: `url('/content/images/shortlisting_background.png')`
  },

  targetToken : {
    position: 'absolute',
    backgroundColor : '#3f51b5',
    height : 30,
    width : 30,
    '&:hover':{
      backgroundColor: '#2c387e',
      cursor: 'pointer'
    },
    '&:active':{
      backgroundColor: '#2c387e',
      cursor: 'grabbing'
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
    backgroundColor : '#2c387e',
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
        
        {generateTargetTokens(classes,props.items,props.positionHandler)}
    </div>
    
  );
}