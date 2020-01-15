import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ShortListBoard from './ShortListBoard';
import HelpIcon from '@material-ui/icons/Help';
import Fab from '@material-ui/core/Fab';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';

/**
 * @ignore
 */
const useStyles = makeStyles(theme => ({
  board : {
    padding : theme.spacing(3)
  },
  helpBox: {
    marginTop: '10%',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    width: 200
  },
  helpButton: {
    margin: 0,
    top: 10,
    right: "5%",
    bottom: 'auto',
    left: 'auto',
    position: 'fixed',
  }
}));
/**
 * TODO
 */
export default function ShortList(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'spring-popper' : undefined;

  return (
    <div>
      <div className={classes.board}>
        <ShortListBoard openSnackbar={props.openSnackbar} />
      </div>
      <Fab component='span' size='small' color='primary' onClick={handleClick} className={classes.helpButton}>
        <HelpIcon/>
      </Fab>
      <Popper id={id} open={open} anchorEl={anchorEl} placement='bottom' transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <div className={classes.helpBox}>
              On the left-hand side you can see all the KPIs saved in the previous step.<br></br>  
              By clicking on a KPI a dot appears in the grid. You can drag and drop the dot based on where you think it should belong.<br></br> 
              Keep in mind that the KPIs get their score based on the importance and ease of measure.<br></br>
              You can click on a KPI to see where the dot is placed and you can hover over the dots to see which KPI it is.<br></br>  
              Once you are happy with the placement of the KPIs on the grid you can save the locations by clicking on the save button. 
            </div>
          </Fade>
        )}
      </Popper>
    </div>
  );
}