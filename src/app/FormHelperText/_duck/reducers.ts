import { Reducer } from 'redux';

import { PasswordTypes as _PasswordTypes } from '../../_common/';

import { FormHelperTextActions } from './actions';

export const INITIAL_STATE: FormHelperTextState = {
    formHelperText: ''
};

const reducer: Reducer<FormHelperTextState, FormHelperTextActions> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default: {
            return { formHelperText: action.formHelperText };
        }
    }
}

export { reducer as formHelperTextReducer };

export interface FormHelperTextState {
    formHelperText: string;
};