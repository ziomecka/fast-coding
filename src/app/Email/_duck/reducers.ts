import { Reducer } from 'redux';
import { applyRules } from '../_duck/operations';

export const INITIAL_STATE: EmailState = {
    email: '',
    emailValid: null
};

import { RulesErrorEnum } from '../../../shared/_types/';
const { NOT_EMAIL } = RulesErrorEnum;

const reducer: Reducer<EmailState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default: {
            const { email } = action;

            return {
                email,
                emailValid: applyRules( [ [ NOT_EMAIL,  { value: email } ] ] )
            };
        }
    }
}

export { reducer as emailReducer };

export interface EmailState {
    email: string;
    emailValid: string;
};