import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DefinitionBoard from './DefinitionBoard';
import Fab from '@material-ui/core/Fab';
import { Link as RouterLink } from 'react-router-dom';
import HelpIcon from '@material-ui/icons/Help';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';

/**
 * @ignore
 */
const useStyles = makeStyles(theme => ({
  board : {
    maxHeight: "650px",
  },
  visualizationButton: {
    margin: 0,
    top: 7,
    right: "45%",
    bottom: 'auto',
    left: 'auto',
    position: 'fixed',
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
export default function Definition(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'spring-popper' : undefined;

  return (
    <div>
      <DefinitionBoard openSnackbar={props.openSnackbar} />
      <Fab color="secondary" component={RouterLink} to='/visualization' className={classes.visualizationButton} variant="extended">
        Open Visualization
      </Fab>

      <Fab component='span' size='small' color='primary' onClick={handleClick} className={classes.helpButton}>
        <HelpIcon/>
      </Fab>
      <Popper id={id} open={open} anchorEl={anchorEl} placement='bottom' transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <div className={classes.helpBox}>
              On the left-hand side you can see all the KPIs shortlisted in the shortlisting step.<br></br>
              By clicking on the KPI, the form of that KPI will appear on the right-hand side.<br></br>
              In the form multiple pieces of information have to be filled in. When the data or part of the data is filled in the button 
              in the lower right corner should be pushed to save the data. After saving, the state next to KPI on the left-hand side, 
              will change to partially defined of defined based on the amount of information completed.<br></br>
              Once done with the definition you can see your scores visually by clicking on the button “Open visualization”
              in the middle of the app bar.<br></br>
            </div>
          </Fade>
        )}
      </Popper>
    </div>
  );
}
