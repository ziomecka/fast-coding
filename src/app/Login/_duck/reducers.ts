import { Reducer } from 'redux';

import { applyRules } from '../_duck/operations';

import { RulesErrorEnum } from '@shared/_types/';
const { NO_SPACES, NO_SPECIALS, NOT_LONG, NO_DIGIT } = RulesErrorEnum;

export const INITIAL_STATE: LoginState = {
    login: '',
    loginValid: null
};

const reducer: Reducer<LoginState> = ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
        default: {
            const { login } = action;

            return {
                login,
                loginValid: applyRules( [
                    [ NO_SPACES, { value: login } ],
                    [ NO_SPECIALS, { value: login, opposite: true } ],
                    [ NO_DIGIT, { value: login, opposite: true } ],
                    [ NOT_LONG, { value: login } ]
                ] )
            };
        }
    }
};

export { reducer as loginReducer };

export interface LoginState {
    login: string;
    loginValid: string;
}