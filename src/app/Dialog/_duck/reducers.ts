import { Action, Reducer } from 'redux';

import { DialogActionsEnum, AppDialogOptions } from './types';
import { DialogActions, OpenDialogAction } from './actions';

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

export interface DialogState extends AppDialogOptions {};