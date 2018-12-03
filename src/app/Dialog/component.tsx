import * as React from 'react';

/** Materials */
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import ButtonWithHint from '../ButtonWithHint';

import { AppDialogProps } from './container';

import { Translate } from 'react-localize-redux';

const DialogComponent: React.StatelessComponent<AppDialogProps> = props => {
  const {
      titleId,
      messageId,
      buttons,
      dialogProps
     } = props;

  return (
    <Dialog
        { ...dialogProps }
        disableBackdropClick={false}
        disableEscapeKeyDown={false}
    >
        <DialogTitle>
            <Translate id={titleId} />
        </DialogTitle>

        <DialogContent>
            <DialogContentText>
                <Translate id={messageId} />
            </DialogContentText>
        </DialogContent>

        <DialogActions>
            {buttons.map((button, ind) => (
                <ButtonWithHint
                    key={`dialogButton-${ind}`}
                    buttonProps={button.buttonProps}
                    translationId={button.translationId}
                    aftertext={button.aftertext}
                />
            ))}
        </DialogActions>
    </Dialog>
  );
};

export default DialogComponent;
