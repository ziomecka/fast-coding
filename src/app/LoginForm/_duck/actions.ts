import { Action, ActionCreator } from 'redux';
import { LoginFormActionsEnum } from './types';

import { SetPasswordAction } from '@app/Password/';

const {
    APP_LOGINFORM_SET_LOGIN,
    APP_LOGINFORM_RESET
} = LoginFormActionsEnum;

export const setLogin: ActionCreator<SetLoginAction> = (login: string) => ({
    type: APP_LOGINFORM_SET_LOGIN,
    login
});

export const reset: ActionCreator<Action> = () => ({
    type: APP_LOGINFORM_RESET
});

export const actions = {
    setLogin,
    reset
};

export interface SetLoginAction extends Action {
    login: string;
}

export type LoginFormActions = Action | SetLoginAction |
    SetPasswordAction;

