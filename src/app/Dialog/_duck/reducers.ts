import { Reducer } from 'redux';

import { DialogTypes } from './types';

import { DialogActions } from './actions';
import { DialogProps } from '@material-ui/core/Dialog';

const {
    APP_DIALOG_OPEN,
    APP_DIALOG_CLOSE
} = DialogTypes;

export const INITIAL_STATE: DialogState = {
    open: false,
    title: ''
};

const reducer: Reducer<DialogState, DialogActions> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case APP_DIALOG_OPEN:
            return {
                ...state,
                open: true
            };

        case APP_DIALOG_CLOSE:
            return {
                ...state,
                open: false
            };

        default:
            return { ...state };
    }
}

export { reducer as dialogReducer };

export interface DialogState extends DialogProps {
};