import { Dispatch } from 'redux';
import { openDialog, closeDialog } from '../app/Dialog/_duck/actions';

export const mapDispatchToProps = (dispatch: Dispatch): DialogDispatch => ({
    openDialog: () => dispatch(openDialog()),
    closeDialog: () => dispatch(closeDialog())
});

export interface DialogDispatch {
    openDialog: () => void;
    closeDialog: () => void;
};