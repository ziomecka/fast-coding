import { Reducer } from 'redux';

import { applyRules } from '../_duck/operations';

import { invalidError } from '../../../shared/_types/';
const { noSpaces, noSpecials, notLong, noDigit } = invalidError;

export const INITIAL_STATE: LoginState = {
    login: '',
    loginValid: undefined,
};

const reducer: Reducer<LoginState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default: {
            const { login } = action;

            return {
                login,
                loginValid: applyRules([
                    [ noSpaces, { value: login } ],
                    [ noSpecials, { value: login, opposite: true } ],
                    [ noDigit, { value: login, opposite: true } ],
                    [ notLong, { value: login } ]
                ])
            };
        }
    }
}

export { reducer as loginReducer };

export interface LoginState {
    login: string;
    loginValid: string | undefined;
};