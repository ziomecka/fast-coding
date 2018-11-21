import { Action, ActionCreator } from 'redux';
import { LoginTypes } from './types';
import { AppContainers } from '../../_common/';

const {
    APP_LOGIN_SET_LOGIN,
} = LoginTypes;

export const setLogin: ActionCreator<SetLoginAction> = (login: string, container: AppContainers) => ({
    type: APP_LOGIN_SET_LOGIN,
    login,
    container
});

export const actions = {
    setLogin
};

export interface SetLoginAction extends Action {
    readonly type: string;
    login: string;
    container: AppContainers;
};

export type LoginActions = SetLoginAction;