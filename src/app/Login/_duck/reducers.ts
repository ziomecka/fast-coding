import { Reducer } from 'redux';

import { applyRules } from '../_duck/operations';

import { invalidError } from '../../_common/';

const { notEmpty, noSpaces } = invalidError;

export const INITIAL_STATE: LoginState = {
    login: '',
    loginValid: undefined,
};

const reducer: Reducer<LoginState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default: {
            return {
                login: action.login,
                loginValid: applyRules(action.login, [notEmpty, noSpaces])
            };
        }
    }
}

export { reducer as loginReducer };

export interface LoginState {
    login: string;
    loginValid: string | undefined;
};