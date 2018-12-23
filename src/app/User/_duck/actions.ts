import { Action, ActionCreator } from 'redux';
import { UserActionsEnum, UserAuthorizeI} from './types';

const {
    APP_USER_AUTHORIZE_USER,
    APP_USER_UNAUTHORIZE
} = UserActionsEnum;

export const authorizeUser: ActionCreator<UserAuthorizationAction> = (options: UserAuthorization) => ({
    type: APP_USER_AUTHORIZE_USER,
    ...options
});

export const unauthorizeUser: ActionCreator<UserAuthorizationAction> = (login: string) => ({
    type: APP_USER_UNAUTHORIZE,
    login
});

export const actions = {
    authorizeUser,
    unauthorizeUser
};

export interface UserAuthorization extends UserAuthorizeI {
    login: string;
}

export type UserAuthorizationAction = UserAuthorization & Action;

export type UserActions = UserAuthorizationAction;