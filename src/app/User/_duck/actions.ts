import { Action, ActionCreator } from 'redux';
import { UserActionsEnum } from './types';

const {
    APP_USER_AUTHORIZE_USER,
    APP_USER_UNAUTHORIZE
} = UserActionsEnum;

export const authorizeUser: ActionCreator<UserAuthorizationAction> = (login: string) => ({
    type: APP_USER_AUTHORIZE_USER,
    login
});

export const unauthorizeUser: ActionCreator<UserAuthorizationAction> = (login: string) => ({
    type: APP_USER_UNAUTHORIZE,
    login
});

export const actions = {
    authorizeUser,
    unauthorizeUser
};

export interface UserAuthorizationAction extends Action {
    login: string;
};

export type UserActions = UserAuthorizationAction;