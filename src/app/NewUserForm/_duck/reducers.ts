import { Reducer } from 'redux';

import { NewUserFormTypes } from './types';
import { PasswordTypes } from '../../Password/_duck/types';
import { LoginTypes } from '../../Login/_duck/types';

import {
    loginReducer, LoginState, INITIAL_STATE as LoginInitialState
} from '../../Login/_duck/reducers';

import {
    passwordReducer, PasswordState, INITIAL_STATE as PasswordInitialState
} from '../../Password/_duck/reducers';

import {
    emailReducer, EmailState, INITIAL_STATE as EmailInitialState
} from '../../Email/_duck/reducers';

import { PasswordTypes as _PasswordTypes } from '../../_common/';

import { NewUserFormActions } from './actions';

const { confirmPass, newPass } = _PasswordTypes;

const {
    APP_PASSWORD_SET_PASSWORD_CONFIRM,
    APP_PASSWORD_SET_PASSWORD_NEW,
    APP_PASSWORD_VALIDATE_NEW,
    APP_PASSWORD_VALIDATE_CONFIRM
} = PasswordTypes;

const {
    APP_NEWUSERFORM_SET_LOGIN,
    APP_NEWUSERFORM_SET_EMAIL,
    APP_NEWUSERFORM_RESET
} = NewUserFormTypes;

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