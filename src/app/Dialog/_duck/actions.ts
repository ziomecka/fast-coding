import { Action, ActionCreator } from 'redux';

import {
    DialogActionsEnum,
    YesDialogOptions,
    YesCancelDialogOptions
} from './types';

const {
    APP_DIALOG_CLOSE,
    APP_DIALOG_OPEN
} = DialogActionsEnum;

export const openDialog: ActionCreator<OpenDialogAction> = ( options: YesDialogOptions | YesCancelDialogOptions ) => ( {
    type: APP_DIALOG_OPEN,
    options
} );

export const closeDialog: ActionCreator<Action> = () => ( {
    type: APP_DIALOG_CLOSE
} );

export const actions = {
    openDialog,
    closeDialog,
};

export interface OpenDialogAction extends Action {
    options: YesDialogOptions | YesCancelDialogOptions;
}

export type DialogActions = OpenDialogAction;
