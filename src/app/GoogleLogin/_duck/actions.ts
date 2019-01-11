import { Action, ActionCreator } from 'redux';
import { GoogleLoginActionsEnum } from './types';

const {
    APP_GOOGLE_LOGIN_FIREBASE_AUTHORIZE
} = GoogleLoginActionsEnum;


export const authorizeFirebase: ActionCreator<Action> = () => ({
    type: APP_GOOGLE_LOGIN_FIREBASE_AUTHORIZE,
});

export const unauthorizeFirebase: ActionCreator<Action> = () => ({
    type: APP_GOOGLE_LOGIN_FIREBASE_AUTHORIZE,
});

export const actions = {
    authorizeFirebase,
    unauthorizeFirebase
};

export type LoginFormActions = Action;

