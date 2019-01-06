import * as React from 'react';

/** Materials */
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import ButtonWithHint from '../ButtonWithHint';

import { AppDialogProps } from './container';

import { Translate } from 'react-localize-redux';

const DialogComponent: React.StatelessComponent<AppDialogProps> = props => {
  const {
      titleId,
      buttons,
      dialogProps,
      Component,
      html
     } = props;

  return (
    <Dialog
        { ...dialogProps }
        disableBackdropClick={false}
        disableEscapeKeyDown={false}
    >
        { titleId && (
            <DialogTitle>
                <Translate id={ titleId } />
            </DialogTitle>
        )}

        { Component && (
            <DialogContent>
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

export default DialogComponent;
