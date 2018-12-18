import { Reducer } from 'redux';

import { NewPasswordFormActionsEnum } from './types';
import { NewPasswordFormActions }  from './actions';

import {
    passwordReducer, PasswordState, INITIAL_STATE as PasswordInitialState
} from '../../Password/_duck/reducers';

import { PasswordActionsEnum } from '../../Password/_duck/types';

import { PasswordsEnum} from '@appTypes';
const { confirmPass, newPass } = PasswordsEnum;

const {
    APP_REMIND_PASSWORD_RESET
} = NewPasswordFormActionsEnum;

const {
    APP_PASSWORD_SET_PASSWORD_CONFIRM,
    APP_PASSWORD_SET_PASSWORD_NEW,
    APP_PASSWORD_VALIDATE_NEW,
    APP_PASSWORD_VALIDATE_CONFIRM
} = PasswordActionsEnum;

export const INITIAL_STATE: NewPasswordFormState = {
    [newPass]: Object.assign({}, PasswordInitialState),
    [confirmPass]: Object.assign({}, PasswordInitialState)
};

const reducer: Reducer<NewPasswordFormState, NewPasswordFormActions> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case APP_PASSWORD_VALIDATE_NEW:
        case APP_PASSWORD_SET_PASSWORD_NEW: {
            const { password, passwordValid } = state[newPass];
            return {
                ...state,
                [newPass]: passwordReducer({ password, passwordValid }, action)
            };
        }

        case APP_PASSWORD_VALIDATE_CONFIRM:
        case APP_PASSWORD_SET_PASSWORD_CONFIRM: {
            const { password, passwordValid } = state[confirmPass];
            return {
                ...state,
                [confirmPass]: passwordReducer({ password, passwordValid }, action)
            };
        }

        case APP_REMIND_PASSWORD_RESET: {
            return {
                ...INITIAL_STATE
            };
        }

        default: {
            return { ... state };
        }
    }
};

export { reducer as newPasswordFormReducer };

export interface NewPasswordFormState {
    [newPass]: PasswordState;
    [confirmPass]: PasswordState;
};