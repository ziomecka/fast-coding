import * as React from 'react';

/** Materials */
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import { AppDialogProps } from './container';

const DialogComponent: React.StatelessComponent<AppDialogProps> = props => {
  const {
      open,
      title,
      message,
      buttons,
      onClose,
      onKeyDown
     } = props;

  return (
    <Dialog
        {...{ open, onClose, onKeyDown }}
        disableBackdropClick={false}
        disableEscapeKeyDown={false}
    >
      <Paper>
        <DialogTitle>
            {title}
        </DialogTitle>

        <DialogContent>
            <DialogContentText>
                {message}
            </DialogContentText>
        </DialogContent>

        <DialogActions>
            {buttons.map((button, ind) => (
                <Button
                    key={`${button[0]}-${ind}`}
                    onClick={button[1]}
                    {...button[2] ? button[2] : null}
                >
                    {button[0]}
                </Button>
            ))}
        </DialogActions>
      </Paper>
    </Dialog>
  );
};

export default DialogComponent;
