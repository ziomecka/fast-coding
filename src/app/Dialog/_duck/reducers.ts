import { Action, Reducer } from 'redux';

import { DialogActionsEnum } from './types';
import { DialogActions, OpenDialogAction } from './actions';
import { DialogProps } from '@material-ui/core/Dialog';
import { ButtonProps } from '@material-ui/core/Button';

const {
    APP_DIALOG_OPEN,
    APP_DIALOG_CLOSE
} = DialogActionsEnum;

export const INITIAL_STATE: DialogState = {
    titleId: '',
    messageId: '',
    buttons: [],
    dialogProps: {
        open: false
    }
};

const reducer: Reducer<DialogState, DialogActions | Action> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case APP_DIALOG_OPEN:
            const { dialogProps, ...other } = (action as OpenDialogAction).options;

            return {
                ...state,
                // @ts-ignore
                ...other,
                dialogProps: {
                    ...dialogProps,
                    open : true
                }
            };

        case APP_DIALOG_CLOSE:
            return {
                titleId: '',
                messageId: '',
                buttons: [],
                dialogProps: {
                    open: false,
                    onClose: null,
                    onEnter: null,
                    onBackdropClick: null,
                    onExited: null,
                    onKeyDown: null
                }
            };

        default:
            return { ...state };
    }
}

export { reducer as dialogReducer };

interface DialogButtonsProps {
    title: string,
    buttonProps: ButtonProps;
    translationId: string;
    aftertext?: string;
    key?: string
}

interface AppDialogOptions {
    messageId: string;
    titleId: string;
    buttons: Array<DialogButtonsProps>;
    dialogProps: DialogProps;
};

export interface DialogOptions extends AppDialogOptions {
    onClose: () => void;
    onEnter?: () => void;
    onBackdropClick?: () => void;
    onExited?: () => void;
    onKeydown?: () => void;
};

export interface DialogState extends AppDialogOptions {};