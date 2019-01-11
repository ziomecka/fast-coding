import { Reducer } from 'redux';
import { DialogProps } from '@material-ui/core/Dialog';

import {
    DialogActionsEnum,
    DialogButtonsProps
} from './types';

import { DialogActions } from './actions';

const {
    APP_DIALOG_OPEN,
    APP_DIALOG_CLOSE
} = DialogActionsEnum;

export const INITIAL_STATE: DialogState = {
    titleId: '',
    buttons: {},
    dialogProps: { open: false },
    Component: null,
    html: null
};

const reducer: Reducer<DialogState, DialogActions> = ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
        case APP_DIALOG_OPEN:

            const { dialogProps, buttons, ...other } = action.options;

            return {
                ...state,
                ...other,
                buttons: { ...buttons },
                dialogProps: {
                    ...dialogProps,
                    open : true
                }
            };

        case APP_DIALOG_CLOSE:
            return {
                ...INITIAL_STATE,
                buttons: {},
                dialogProps: { open: false }
            };

        default:
            return { ...state };
    }
};

export { reducer as dialogReducer };

export interface DialogState {
    titleId: string;
    buttons: { [key: string]: DialogButtonsProps };
    dialogProps?: DialogProps;
    Component: React.ComponentClass | React.FunctionComponent;
    html: JSX.Element
}
