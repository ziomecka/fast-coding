import { Reducer } from 'redux';

import { NewUserFormTypes } from './types';
import { PasswordTypes } from '../../Password/_duck/types';
import { LoginTypes } from '../../Login/_duck/types';

import { loginReducer, LoginState } from '../../Login/_duck/reducers';
import { passwordReducer, PasswordState } from '../../Password/_duck/reducers';

import { INITIAL_STATE as LoginInitialState } from '../../Login/_duck/reducers';
import { INITIAL_STATE as PasswordInitialState } from '../../Password/_duck/reducers';

import { PasswordTypes as _PasswordTypes } from '../../_common/';

import { NewUserFormActions } from './actions';

const { confirmPass, newPass } = _PasswordTypes;

const {
    APP_PASSWORD_SET_PASSWORD_CONFIRM,
    APP_PASSWORD_SET_PASSWORD_NEW
} = PasswordTypes;

const {
    APP_LOGIN_SET_LOGIN
} = LoginTypes;

const {
    APP_NEWUSERFORM_CREATE_NEWUSER
} = NewUserFormTypes;

export const INITIAL_STATE: NewUserFormState = {
    ...LoginInitialState,
    [newPass]: Object.assign({}, PasswordInitialState),
    [confirmPass]: Object.assign({}, PasswordInitialState)
};

const reducer: Reducer<NewUserFormState, NewUserFormActions> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case APP_PASSWORD_SET_PASSWORD_NEW: {
            const { password, passwordValid } = state[newPass];
            return {
                ...state,
                [newPass]: passwordReducer({ password, passwordValid }, action)
            };
        }

        case APP_PASSWORD_SET_PASSWORD_CONFIRM: {
            const { password, passwordValid } = state[confirmPass];
            return {
                ...state,
                [confirmPass]: passwordReducer({ password, passwordValid }, action)
            }
        }

        case APP_LOGIN_SET_LOGIN: {
            return {
                ...state,
                ...loginReducer(state, action)
            };
        }

        default: {
            return { ...state };
        }
    }
}

export { reducer as newUserFormReducer };

export interface NewUserFormState extends LoginState {
    [newPass]: PasswordState;
    [confirmPass]: PasswordState;
};