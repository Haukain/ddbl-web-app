import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import red from '@material-ui/core/colors/red';
import clsx from 'clsx';

/**
 * @ignore
 */
const useStyles = makeStyles(theme =>
  createStyles({
    close: {
      padding: theme.spacing(0.5)
    },
    error: {
      backgroundColor: red[700]
    }
  })
);

/**
 * This is a function which display a message of success or failure in a snackbar  
 */
export default function SimpleSnackbar(props) {
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    props.handleClose();
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={true}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <SnackbarContent
          className={clsx(props.snack.error && classes.error)}
          aria-describedby={'message-id'}
          message={<span id='message-id'>{props.snack.msg}</span>}
          action={[
            <IconButton
              key='close'
              aria-label='close'
              color='inherit'
              className={classes.close}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        ></SnackbarContent>
      </Snackbar>
    </div>
  );
}
