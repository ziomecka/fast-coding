import { Action, ActionCreator } from 'redux';
import { UserTypes } from './types';

const {
    APP_USER_AUTHORIZE_USER,
    APP_USER_UNAUTHORIZE
} = UserTypes;

export const authorizeUser: ActionCreator<Action> = () => ({
    type: APP_USER_AUTHORIZE_USER
});

export const unauthorizeUser: ActionCreator<Action> = () => ({
    type: APP_USER_UNAUTHORIZE
});

export const actions = {
    authorizeUser,
    unauthorizeUser
};

export type UserActions = Action;