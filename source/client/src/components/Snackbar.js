import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import deepOrange from '@material-ui/core/colors/deepOrange';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    close: {
      padding: theme.spacing(0.5),
    },
    error: {
        backgroundColor: deepOrange[700],
    },
  }),
);

export default function SimpleSnackbar(props) {
  const classes = useStyles();

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    props.handleClose()
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={props.snack.opened}
        autoHideDuration={5000}
        onClose={handleClose}
      >
          <SnackbarContent
            className={clsx(props.snack.error && classes.error)}
            aria-describedby={'message-id'}
            message={<span id="message-id">{props.snack.msg}</span>}
            action={[
                <IconButton
                key="close"
                aria-label="close"
                color="inherit"
                className={classes.close}
                onClick={handleClose}
                >
                <CloseIcon />
                </IconButton>,
            ]}>
          </SnackbarContent>
      </Snackbar>
    </div>
  );
}