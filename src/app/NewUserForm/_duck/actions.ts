import { Action, ActionCreator } from 'redux';
import { NewUserFormTypes } from './types';

import { SetPasswordAction } from '../../Password/_duck/actions';

const {
    APP_NEWUSERFORM_SET_LOGIN,
    APP_NEWUSERFORM_SET_EMAIL,
    APP_NEWUSERFORM_RESET
} = NewUserFormTypes;

export const setLogin: ActionCreator<SetLoginAction> = (login: string) => ({
    type: APP_NEWUSERFORM_SET_LOGIN,
    login
});

export const setEmail: ActionCreator<SetEmailAction> = (email: string) => ({
    type: APP_NEWUSERFORM_SET_EMAIL,
    email
});

export const reset: ActionCreator<Action> = () => ({
    type: APP_NEWUSERFORM_RESET
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

export type NewUserFormActions = Action | SetPasswordAction |
    SetLoginAction |
    SetEmailAction;