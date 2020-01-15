import React from 'react';
import Container from '@material-ui/core/Container';
import LonglistBoard from './LonglistBoard';
import { makeStyles } from '@material-ui/core/styles';
import HelpIcon from '@material-ui/icons/Help';
import Fab from '@material-ui/core/Fab';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop : theme.spacing(10)
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1
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

export default function Longlist(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'spring-popper' : undefined;

  return (
    <Container>
      <div  className={classes.root}>
        <LonglistBoard openSnackbar={props.openSnackbar}/>
      </div>
      <Fab component='span' size='small' color='primary' onClick={handleClick} className={classes.helpButton}>
        <HelpIcon/>
      </Fab>
      <Popper id={id} open={open} anchorEl={anchorEl} placement='bottom' transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <div className={classes.helpBox}>
              On the left-hand side of the screen you can add KPIs manually, 
              you can add multiple by clicking on the + button after you have completed your current KPI.<br></br>
              You can also import the .xml of the Visio file containing your KPI tree.<br></br>
              You can check and uncheck KPIs in the list, only checked KPIs will be saved.
              KPIs can be edited by double clicking on a KPI. <br></br>
              After you’ve added all the KPIs you can save the longlist on the bottom right corner.
            </div>
          </Fade>
        )}
      </Popper>
    </Container>
  );
}
