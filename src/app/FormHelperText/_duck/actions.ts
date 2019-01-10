import { Action, ActionCreator } from 'redux';
import { FormHelperTextActionsEnum } from './types';

const {
    APP_FORM_HELPER_TEXT_SET
} = FormHelperTextActionsEnum;

export const setFormHelperText: ActionCreator<SetFormHelperTextAction> = (formHelperText: string) => ({
    type: APP_FORM_HELPER_TEXT_SET,
    formHelperText
});

export const actions = {
    setFormHelperText
};

export interface SetFormHelperTextAction extends Action {
    formHelperText: string;
}

export type FormHelperTextActions = SetFormHelperTextAction;