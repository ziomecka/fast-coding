
import { Reducer } from 'redux';

import { UserTypes } from './types';
// import { SubscriptionsEnum } from '../../../shared/subscriptions';
import { UserActions } from './actions';

const {
    APP_USER_AUTHORIZE_USER,
    APP_USER_UNAUTHORIZE
} = UserTypes;

export const INITIAL_STATE: UserState = {
    login: '',
    authorized: false
};

const reducer: Reducer<UserState, UserActions> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case APP_USER_AUTHORIZE_USER: {
            return {
                ...state,
                login: action.login,
                authorized: true
            };
        }

        case APP_USER_UNAUTHORIZE: {
            return {
                ...state,
                login: action.login,
                authorized: false
            }
        }

        default: {
            return {
                ...state
            };
        }
    }
}

export { reducer as userReducer };

export interface UserState {
    login: string;
    authorized: boolean;
};