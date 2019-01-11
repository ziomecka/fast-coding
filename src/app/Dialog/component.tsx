import * as React from 'react';

/** Materials */
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseButton from '@material-ui/icons/Close';

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
      classes: { dialog, dialogContent, closeButton : closeButtonClass },
      closeButton,
      closeDialog
     } = props;

  return (
    <Dialog
        { ...dialogProps }
        disableBackdropClick={false}
        disableEscapeKeyDown={false}
        PaperProps={ closeButton
            ? { style: { paddingTop: '4em' } }
            : null
        }
        classes={{ paper: dialog }}
    >
        { closeButton && (
            <IconButton
                className={ closeButtonClass }
                onClick={ closeDialog }
            >
                <CloseButton/>
            </IconButton>
        ) }

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
            { Object.keys( buttons ).map( ( button, ind ) => (
                <ButtonWithHint
                    key={`dialogButton-${ ind }`}
                    { ...buttons[ button ] }
                />
            ) ) }
        </DialogActions>
    </Dialog>
  );
};

export default withStyles( styles )( DialogComponent );
