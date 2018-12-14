import { Action, ActionCreator } from 'redux';
import { UserTypes } from './types';

const {
    APP_USER_AUTHORIZE_USER,
    APP_USER_UNAUTHORIZE
} = UserTypes;

export const authorizeUser: ActionCreator<UserAuthorizationAction> = (login: string) => ({
    type: APP_USER_AUTHORIZE_USER,
    login
});

export const unauthorizeUser: ActionCreator<Action> = () => ({
    type: APP_USER_UNAUTHORIZE
});

export const actions = {
    authorizeUser,
    unauthorizeUser
};

export interface UserAuthorizationAction extends Action {
    login: string;
};

export type UserActions = UserAuthorizationAction;