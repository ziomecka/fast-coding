import * as React from 'react';

/** Materials */
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import ButtonWithHint from '@app/ButtonWithHint';

import { AppDialogProps } from './container';

import { Translate } from 'react-localize-redux';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

const DialogComponent: React.StatelessComponent<AppDialogProps> = props => {
  const {
      titleId,
      buttons,
      dialogProps,
      Component,
      html,
      classes: { dialog, dialogContent, dialogContentRoot }
     } = props;

  return (
    <Dialog
        { ...dialogProps }
        disableBackdropClick={false}
        disableEscapeKeyDown={false}
        classes={{ paper: dialog }}
    >
        { titleId && (
            <DialogTitle>
                <Translate id={ titleId } />
            </DialogTitle>
        )}

        { Component && (
            <DialogContent className={ dialogContent } >
                <Component />
            </DialogContent>
        )}

        { html && (
            <DialogContent>
                { html }
            </DialogContent>
        )}

        <DialogActions>
            { Object.keys(buttons).map((button, ind) => (
                <ButtonWithHint
                    key={`dialogButton-${ ind }`}
                    { ...buttons[ button ] }
                />
            )) }
        </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(DialogComponent);
