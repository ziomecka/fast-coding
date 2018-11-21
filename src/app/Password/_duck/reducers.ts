import { Reducer } from 'redux';

import { PasswordTypes } from './types';
import { applyRules } from '../_duck/operations';

import { invalidError } from '../../_common/';

const { notEmpty, noSpaces } = invalidError;

const {
    APP_PASSWORD_SET_PASSWORD_CURRENT,
    APP_PASSWORD_SET_PASSWORD_NEW,
    APP_PASSWORD_SET_PASSWORD_CONFIRM
} = PasswordTypes;

export const INITIAL_STATE: PasswordState = {
    password: '',
    passwordValid: undefined
};

const reducer: Reducer<PasswordState> = (state = INITIAL_STATE, action)=> {
    switch (action.type) {
        case (APP_PASSWORD_SET_PASSWORD_CONFIRM):
        case (APP_PASSWORD_SET_PASSWORD_CURRENT):
        case (APP_PASSWORD_SET_PASSWORD_NEW): {
            const { password } = action;

            return {
                password,
                passwordValid: applyRules(password, [notEmpty, noSpaces])
            };
        }

        default: {
            return { ...state };
        }
    }
}

export { reducer as passwordReducer };

export interface PasswordState {
    password: string;
    passwordValid: string | undefined
};