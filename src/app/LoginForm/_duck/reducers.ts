import { Reducer } from 'redux';

import { LoginFormTypes } from './types';
import { PasswordTypes } from '../../Password/_duck/types';
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

const {
    APP_LOGINFORM_SET_LOGIN,
    APP_LOGINFORM_RESET
} = LoginFormTypes;

import { PasswordTypes as _PasswordTypes } from '../../_common/';
const { pass } = _PasswordTypes;

const {
    APP_PASSWORD_SET_PASSWORD_CURRENT,
    APP_PASSWORD_SET_PASSWORD_CONFIRM,
    APP_PASSWORD_SET_PASSWORD_NEW
} = PasswordTypes;

export const INITIAL_STATE: LoginFormState = {
    [pass]: { ...PASSWORD_INITIAL_STATE },
    ...LOGIN_INITIAL_STATE
};

export interface LoginFormState extends LoginState {
    [pass]: PasswordState
};

const reducer: Reducer<LoginFormState, LoginFormActions> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        /** Watch out! */
        case APP_PASSWORD_SET_PASSWORD_CURRENT:
        case APP_PASSWORD_SET_PASSWORD_NEW:
        case APP_PASSWORD_SET_PASSWORD_CONFIRM: {
            const { password, passwordValid } = state[pass];

            return {
                ...state,
                [pass]: passwordReducer({ password, passwordValid }, action)
            };
        }

        case APP_LOGINFORM_SET_LOGIN: {
            return {
                ...state,
                ...loginReducer(state, action)
            };
        }

        case APP_LOGINFORM_RESET: {
            return {
                [pass]: { ...PASSWORD_INITIAL_STATE },
                ...LOGIN_INITIAL_STATE
            };
        }

        default: {
            return { ... state };
        }
    }
};

export { reducer as loginFormReducer };