import { Action, ActionCreator } from 'redux';
import { ChangePasswordFormActionsEnum } from './types';

import { SetPasswordAction } from '../../Password/_duck/actions';

const {
    APP_CHANGEPASSWORDFORM_SET_LOGIN,
    APP_CHANGEPASSWORDFORM_SET_EMAIL,
    APP_CHANGEPASSWORDFORM_RESET
} = ChangePasswordFormActionsEnum;

export const setLogin: ActionCreator<SetLoginAction> = (login: string) => ({
    type: APP_CHANGEPASSWORDFORM_SET_LOGIN,
    login
});

export const setEmail: ActionCreator<SetEmailAction> = (email: string) => ({
    type: APP_CHANGEPASSWORDFORM_SET_EMAIL,
    email
});

export const reset: ActionCreator<Action> = () => ({
    type: APP_CHANGEPASSWORDFORM_RESET
});

export const actions = {
    setLogin,
    setEmail,
    reset
};

export interface SetLoginAction extends Action {
    login: string;
};

export interface SetEmailAction extends Action {
    email: string;
};

export type ChangePasswordFormActions = Action | SetPasswordAction |
    SetLoginAction |
    SetEmailAction;