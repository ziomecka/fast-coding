import { Dispatch, Action } from 'redux';

import {
    closeDialog,
    openDialog,
    OpenDialogOptions
} from '@app/Dialog/'

export const mapDispatchToProps = (dispatch: Dispatch): DialogDispatch => ({
    openDialog: options => dispatch( openDialog( options ) ),
    closeDialog: () => dispatch( closeDialog() )
});

export interface DialogDispatch {
    openDialog: ( options: OpenDialogOptions ) => Action;
    closeDialog: () => Action;
};