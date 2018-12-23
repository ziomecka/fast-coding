import { Action, ActionCreator } from 'redux';
import { GoogleLoginActionsEnum } from './types';

const {
    APP_GOOGLE_LOGIN_FIREBASE_AUTHORIZE
} = GoogleLoginActionsEnum;


export const authorizeFirebase: ActionCreator<Action> = () => ({
    type: APP_GOOGLE_LOGIN_FIREBASE_AUTHORIZE,
});

export const actions = {
    authorizeFirebase
};


// export interface authorizeFirebaseI {
//     googleUrl: string;
//     access_type: string;
//     client_id: string;
//     response_type: string;
// };

// export type authorizeFirebaseAction = authorizeFirebaseI & Action;

export type LoginFormActions = Action;

