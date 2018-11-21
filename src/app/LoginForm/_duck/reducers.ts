import { Reducer } from 'redux';

import { LoginFormTypes } from './types';
import { PasswordTypes } from '../../Password/_duck/types';
import { LoginTypes } from '../../Login/_duck/types';
import { LoginFormActions }  from './actions';

import {
    passwordReducer,
    PasswordState,
    INITIAL_STATE as PASSWORD_INITIAL_STATE
} from '../../Password/_duck/reducers';

import {
    loginReducer,
    LoginState,
    INITIAL_STATE as LOGIN_INITIAL_STATE
} from '../../Login/_duck/reducers';

const {} = LoginFormTypes;

const {
    APP_PASSWORD_SET_PASSWORD_CURRENT,
    APP_PASSWORD_SET_PASSWORD_CONFIRM,
    APP_PASSWORD_SET_PASSWORD_NEW
} = PasswordTypes;

const {
    APP_LOGIN_SET_LOGIN
} = LoginTypes;

export const INITIAL_STATE: LoginFormState = {
    ...PASSWORD_INITIAL_STATE,
    ...LOGIN_INITIAL_STATE
};

export interface LoginFormState extends PasswordState, LoginState {
};

const reducer: Reducer<LoginFormState, LoginFormActions> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        /** Watch out! */
        case APP_PASSWORD_SET_PASSWORD_CURRENT:
        case APP_PASSWORD_SET_PASSWORD_NEW:
        case APP_PASSWORD_SET_PASSWORD_CONFIRM:
        {
            return {
                ...state,
                ...passwordReducer(state, action)
            };
        }

        case APP_LOGIN_SET_LOGIN: {
            return {
                ...state,
                ...loginReducer(state, action)
            };
        }

        default: {
            return { ... state };
        }
    }
};

export { reducer as loginFormReducer };