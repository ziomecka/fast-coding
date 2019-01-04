import { Dispatch, Action } from 'redux';
import { openDialog, closeDialog, OpenDialogAction } from '@app/Dialog/_duck/actions';
import { DialogOptions } from '@app/Dialog/_duck/types';

export const mapDispatchToProps = (dispatch: Dispatch): DialogDispatch => ({
    openDialog: (options) => dispatch(openDialog(options)),
    closeDialog: () => dispatch(closeDialog())
});

export interface DialogDispatch {
    openDialog: (options: DialogOptions ) => OpenDialogAction;
    closeDialog: () => Action;
};