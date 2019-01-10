import { Reducer } from 'redux';

import { RemindPasswordActionsEnum } from './types';
import { RemindPasswordActions }  from './actions';

import {
    emailReducer, EmailState, INITIAL_STATE as EmailInitialState
} from '@app/Email/_duck/reducers';

const {
    APP_REMIND_PASSWORD_SET_EMAIL,
    APP_REMIND_PASSWORD_RESET
} = RemindPasswordActionsEnum;

export const INITIAL_STATE: RemindPasswordState = {
    ...EmailInitialState,
};

const reducer: Reducer<RemindPasswordState, RemindPasswordActions> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case APP_REMIND_PASSWORD_SET_EMAIL : {
            return {
                ...emailReducer(state, action)
            };
        }

        case APP_REMIND_PASSWORD_RESET: {
            return {
                ...INITIAL_STATE
            };
        }

        default: {
            return { ... state };
        }
    }
};

export { reducer as remindPasswordReducer };

export interface RemindPasswordState extends EmailState {}