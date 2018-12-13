import { Reducer } from 'redux';
import { applyRules } from '../_duck/operations';

export const INITIAL_STATE: EmailState = {
    email: '',
    emailValid: null
};

import { invalidError } from '../../../shared/_types/';
const { notEmail } = invalidError;

const reducer: Reducer<EmailState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default: {
            const { email } = action;

            return {
                email,
                emailValid: applyRules( [ [ notEmail,  { value: email } ] ] )
            };
        }
    }
}

export { reducer as emailReducer };

export interface EmailState {
    email: string;
    emailValid: string | undefined
};