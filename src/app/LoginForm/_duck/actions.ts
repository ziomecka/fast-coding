import { Action, ActionCreator } from 'redux';
import { LoginFormTypes } from './types';

import { SetPasswordAction } from '../../Password/_duck/actions';
import { SetLoginAction } from '../../Login/_duck/actions';

const {
    APP_LOGINFORM_SET_LOGINFORM,
} = LoginFormTypes;

export const setLoginForm: ActionCreator<SendLoginFormAction> = (loginForm: string) => ({
    type: APP_LOGINFORM_SET_LOGINFORM,
    loginForm
});

export interface SendLoginFormAction extends Action {
    readonly type: string;
    loginForm: string;
};

export type LoginFormActions = SendLoginFormAction |
    SetPasswordAction |
    SetLoginAction;

