import { Reducer } from 'redux';

import { NewUserFormActionsEnum } from './types';
import { PasswordActionsEnum } from '@app/Password/';

import {
    loginReducer, LoginState, INITIAL_STATE as LoginInitialState
} from '@app/Login/_duck/reducers';

import {
    passwordReducer, PasswordState, INITIAL_STATE as PasswordInitialState
} from '@app/Password/_duck/reducers';

import {
    emailReducer, EmailState, INITIAL_STATE as EmailInitialState
} from '@app/Email/_duck/reducers';

import { PasswordsEnum } from '@appTypes';

import { NewUserFormActions } from './actions';

const { confirmPass, newPass } = PasswordsEnum;

const {
    APP_PASSWORD_SET_PASSWORD_CONFIRM,
    APP_PASSWORD_SET_PASSWORD_NEW,
    APP_PASSWORD_VALIDATE_NEW,
    APP_PASSWORD_VALIDATE_CONFIRM
} = PasswordActionsEnum;

const {
    APP_NEWUSERFORM_SET_LOGIN,
    APP_NEWUSERFORM_SET_EMAIL,
    APP_NEWUSERFORM_RESET
} = NewUserFormActionsEnum;

export const INITIAL_STATE: NewUserFormState = {
    ...LoginInitialState,
    ...EmailInitialState,
    [newPass]: Object.assign({}, PasswordInitialState),
    [confirmPass]: Object.assign({}, PasswordInitialState),
};

const reducer: Reducer<NewUserFormState, NewUserFormActions> = (state = INITIAL_STATE, action) => {
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

        case APP_NEWUSERFORM_SET_LOGIN: {
            return {
                ...state,
                ...loginReducer(state, action)
            };
        }

        case APP_NEWUSERFORM_SET_EMAIL: {
            return {
                ...state,
                ...emailReducer(state, action)
            };
        }

        case APP_NEWUSERFORM_RESET: {
            return {
                ...LoginInitialState,
                ...EmailInitialState,
                [newPass]: Object.assign({}, PasswordInitialState),
                [confirmPass]: Object.assign({}, PasswordInitialState)
            };
        }

        default: {
            return { ...state };
        }
    }
}

export { reducer as newUserFormReducer };

export interface NewUserFormState extends LoginState, EmailState {
    [newPass]: PasswordState;
    [confirmPass]: PasswordState;
};