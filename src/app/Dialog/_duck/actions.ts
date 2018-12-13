import { Action, ActionCreator } from 'redux';
import { DialogTypes } from './types';

import { DialogOptions } from './reducers';

const {
    APP_DIALOG_CLOSE,
    APP_DIALOG_OPEN
} = DialogTypes;

export const openDialog: ActionCreator<OpenDialogAction> = (options: DialogOptions) => ({
    type: APP_DIALOG_OPEN,
    options
});

export const closeDialog: ActionCreator<Action> = () => ({
    type: APP_DIALOG_CLOSE
});

export const actions = {
    openDialog,
    closeDialog,
};

export interface OpenDialogAction extends Action {
    readonly type: string;
    options: DialogOptions;
};

export type DialogActions = Action | OpenDialogAction;