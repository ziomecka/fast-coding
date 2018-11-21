import { Action, ActionCreator } from 'redux';
import { DialogTypes } from './types';

const {
    APP_DIALOG_CLOSE,
    APP_DIALOG_OPEN
} = DialogTypes;


export const openDialog: ActionCreator<OpenDialogAction> = (login: string) => ({
    type: APP_DIALOG_OPEN
});

export const closeDialog: ActionCreator<CloseDialogAction> = (login: string) => ({
    type: APP_DIALOG_CLOSE
});

export const actions = {
    openDialog,
    closeDialog
};

export interface OpenDialogAction extends Action {
    readonly type: string;
};

export interface CloseDialogAction extends Action {
    readonly type: string;
};

export type DialogActions = OpenDialogAction | CloseDialogAction;