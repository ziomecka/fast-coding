import { Dispatch } from 'redux';
import { openDialog, closeDialog } from '../app/Dialog/_duck/actions';
import { DialogOptions } from '../app/Dialog/_duck/reducers';

export const mapDispatchToProps = (dispatch: Dispatch): DialogDispatch => ({
    openDialog: (options) => dispatch(openDialog(options)),
    closeDialog: () => dispatch(closeDialog())
});

export interface DialogDispatch {
    openDialog: (options: DialogOptions ) => void;
    closeDialog: () => void;
};