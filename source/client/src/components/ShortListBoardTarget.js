import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Draggable from 'react-draggable';
import clsx from 'clsx';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import { TextField } from '@material-ui/core';

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
  },
  commentDiv : {
    float:'right',
    borderStyle: 'solid', 
    width: 250, 
    height : 400
  },
  commentElement :{
    margin:10, 
    width:'90%'
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

function generateComment(classes,items,commentHandler,kpi,setKpi) {
  let comment = []
  let dataId = [];
  let dataName = [];
  for (let [i,k] of items.entries()) {
    if(!items[i].hidden){
      dataId.push(i)
      dataName.push(k.name)
    }
  }
  function MakeItem(X) {
      return <option>{X}</option>;
  };
    comment.push(
      <div>
      <Select 
          className={classes.commentElement}
          native
          value={kpi.name}
          onChange={ev=> setKpi({id : dataId[dataName.indexOf(ev.target.value)],name : ev.target.value})}
        >
          <option value="" />
          {dataName.map(MakeItem)}
        </Select>
        {(kpi.id !== null)&&(kpi.id !== undefined) ? (
        <TextField 
          className={classes.commentElement}
          multiline
          rows="4"
          rowsMax="15"
          label="comment"
          variant="outlined" 
          value={(kpi.id !== null)&&(items.length > 0)  ? (items[kpi.id].comment) : ("") }
          onChange={e=> commentHandler(kpi.id,e)}
          />
          ):(null)}
      </div>
      )
  return comment
}

export default function ShortListBoardTarget(props) {
  const classes = useStyles();
  const [kpi,setKpi] = React.useState({id:null,name:null});
  console.log(kpi)
  return (
    <div>
      <div className={classes.commentDiv}>
        {generateComment(classes,props.items,props.commentHandler,kpi,setKpi)}
      </div>
      <div className={classes.targetRoot}>
          
        {generateTargetTokens(classes,props.items,props.positionHandler)}
      </div>
    </div>
  );
}