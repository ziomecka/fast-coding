import * as React from 'react';

// require('./style.sass');

/** Materials */
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
// import Button from '@material-ui/core/Button';

import { AppDialogProps } from './container';

const DialogComponent: React.StatelessComponent<AppDialogProps> = props => {
  const { open = false, ...other } = props;

  return (
    <Dialog {...{ open }}>
      <Paper>
        <DialogTitle>title</DialogTitle>
        <div>
          <p>djfksajf</p>
        </div>
      </Paper>
    </Dialog>
  );
};

export default DialogComponent;
