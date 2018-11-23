import { Action, Reducer } from 'redux';

import { DialogTypes } from './types';
import { DialogActions } from './actions';
import { DialogProps } from '@material-ui/core/Dialog';
import { ButtonProps } from '@material-ui/core/Button';

const {
    APP_DIALOG_OPEN,
    APP_DIALOG_CLOSE
} = DialogTypes;

export const INITIAL_STATE: DialogState = {
    open: false,
    title: '',
    message: '',
    buttons: []
};

const reducer: Reducer<DialogState, DialogActions | Action> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case APP_DIALOG_OPEN:
            return {
                ...state,
                open: true,
                // @ts-ignore
                ...action.options
            };

        case APP_DIALOG_CLOSE:
            return {
                open: false,
                title: '',
                message: '',
                buttons: []
            };

        default:
            return { ...state };
    }
}

export { reducer as dialogReducer };

interface AppDialogOptions {
    message: string;
    buttons: Array<[string, () => void, ButtonProps?]>;
};

export interface DialogOptions extends AppDialogOptions {
    title: string;
    onClose: () => void;
    onEnter?: () => void;
    onEscapeClickDown?: () => void;
    onBackdropClick?: () => void;
    onExited?: () => void;
    onExiting?: () => void;
};

export interface DialogState extends AppDialogOptions, DialogProps {};