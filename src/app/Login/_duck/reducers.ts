import { Reducer } from 'redux';

import { LoginTypes } from './types';
import { applyRules } from '../_duck/operations';

import { invalidError } from '../../_common/';

const { notEmpty, noSpaces } = invalidError;

const {
    APP_LOGIN_SET_LOGIN
} = LoginTypes;

export const INITIAL_STATE: LoginState = {
    login: '',
    loginValid: undefined,
};

const reducer: Reducer<LoginState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case APP_LOGIN_SET_LOGIN: {
            return {
                login: action.login,
                loginValid: applyRules(action.login, [notEmpty, noSpaces])
            };
        }

        default: {
            return {
                ...state
            };
        }
    }
}

export { reducer as loginReducer };

export interface LoginState {
    login: string;
    loginValid: string | undefined;
};