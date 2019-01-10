import { Reducer } from 'redux';

import { PasswordActionsEnum } from './types';

const {
    APP_PASSWORD_SET_PASSWORD_CURRENT,
    APP_PASSWORD_SET_PASSWORD_NEW,
    APP_PASSWORD_SET_PASSWORD_CONFIRM,
    APP_PASSWORD_SET_PASSWORD,
    APP_PASSWORD_VALIDATE_CURRENT,
    APP_PASSWORD_VALIDATE_NEW,
    APP_PASSWORD_VALIDATE_CONFIRM,
    APP_PASSWORD_VALIDATE
} = PasswordActionsEnum;

export const INITIAL_STATE: PasswordState = {
    password: '',
    passwordValid: undefined
};

const reducer: Reducer<PasswordState> = (state = INITIAL_STATE, action)=> {
    switch (action.type) {
        case (APP_PASSWORD_SET_PASSWORD):
        case (APP_PASSWORD_SET_PASSWORD_CONFIRM):
        case (APP_PASSWORD_SET_PASSWORD_CURRENT):
        case (APP_PASSWORD_SET_PASSWORD_NEW): {
            const { password } = action;

            return {
                ...state,
                password,
            };
        }

        case APP_PASSWORD_VALIDATE:
        case APP_PASSWORD_VALIDATE_CURRENT:
        case APP_PASSWORD_VALIDATE_CONFIRM:
        case APP_PASSWORD_VALIDATE_NEW: {
            return {
                ...state,
                passwordValid: action.passwordValid
            };
        }

        default: {
            return { ...state };
        }
    }
};

export { reducer as passwordReducer };

export interface PasswordState {
    password: string;
    passwordValid: string | undefined
};