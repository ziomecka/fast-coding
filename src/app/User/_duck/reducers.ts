
import { Reducer } from 'redux';

import { UserActionsEnum, UserAuthorizeI } from './types';
import { UserActions } from './actions';

const {
    APP_USER_AUTHORIZE_USER,
    APP_USER_UNAUTHORIZE
} = UserActionsEnum;

export const INITIAL_STATE: UserState = {
    login: null,
    authorized: false,
    displayName: null,
    email: null,
    photoURL: null,
    refreshToken: null,
    authorizationMethod: null
};

const reducer: Reducer<UserState, UserActions> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case APP_USER_AUTHORIZE_USER: {
            return {
                ...state,
                ...action,
                authorized: true
            };
        }

        case APP_USER_UNAUTHORIZE: {
            return {
                ...INITIAL_STATE
            };
        }

        default: {
            return {
                ...state
            };
        }
    }
};

export { reducer as userReducer };

export interface UserState extends UserAuthorizeI {
    login: string;
    authorized: boolean
}