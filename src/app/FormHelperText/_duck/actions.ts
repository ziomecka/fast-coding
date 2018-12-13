import { Action, ActionCreator } from 'redux';
import { FormHelperTextTypes } from './types';

const {
    APP_FORM_HELPER_TEXT_SET
} = FormHelperTextTypes;

export const setFormHelperText: ActionCreator<SetFormHelperTextAction> = (formHelperText: string) => ({
    type: APP_FORM_HELPER_TEXT_SET,
    formHelperText
});

export const actions = {
    setFormHelperText
};

export interface SetFormHelperTextAction extends Action {
    formHelperText: string;
};

export type FormHelperTextActions = SetFormHelperTextAction;