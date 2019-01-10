import { Reducer } from 'redux';

import { GoogleLoginActionsEnum } from './types';

const {
    APP_GOOGLE_LOGIN_FIREBASE_AUTHORIZE
} = GoogleLoginActionsEnum;

export const INITIAL_STATE: GoogleLoginState = {
    googleUrl: '',
    firebaseAuthorized: false
};

const reducer: Reducer<GoogleLoginState> = ( state = INITIAL_STATE, action )=> {
    switch ( action.type ) {

        case APP_GOOGLE_LOGIN_FIREBASE_AUTHORIZE: {
            return {
                ...state,
                firebaseAuthorized: true
            };
        }
        default: {
            return { ...state };
        }
    }
};

export { reducer as googleLoginReducer };

export interface GoogleLoginState {
    googleUrl: string;
    firebaseAuthorized: boolean;
}
