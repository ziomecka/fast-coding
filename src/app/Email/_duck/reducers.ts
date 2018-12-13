import { Reducer } from 'redux';

export const INITIAL_STATE: EmailState = {
    email: ''
    // emailValid: undefined,
};

const reducer: Reducer<EmailState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default: {
            return {
                email: action.email
            };
        }
    }
}

export { reducer as emailReducer };

export interface EmailState {
    email: string;
    // emailValid: string | undefined;
};