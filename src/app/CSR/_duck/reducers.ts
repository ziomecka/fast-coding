import { Reducer } from 'redux';

import { CSRTypes } from './types';
import { CSRActions, ReportErrorAction, ChangeLoadingStateAction, UpdateDataAction } from './actions';
import { ApplicationState } from '../../../store';

const {
    APP_CSR_CHANGE_LOADING_STATE,
    APP_CSR_REPORT_ERROR,
    APP_CSR_UPDATE_DATA
} = CSRTypes;

export const INITIAL_STATE: ApplicationState = {
    loading: false,
    error: '',
};

const reducer: Reducer<ApplicationState, CSRActions> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case APP_CSR_CHANGE_LOADING_STATE: {
            const { applicationContainer, container, loading } = action as ChangeLoadingStateAction;
            return {
                ...state,
                [applicationContainer]: {
                    ...state[applicationContainer],
                    [container]: {
                        ...state[applicationContainer][container],
                        loading
                    }
                }
            };
        }

        case APP_CSR_REPORT_ERROR: {
            const { applicationContainer, container, error } = action as ReportErrorAction;
            return {
                ...state,
                [applicationContainer]: {
                    ...state[applicationContainer],
                    [container]: {
                        ...state[applicationContainer][container],
                        error
                    }
                }
            };
        }

        case APP_CSR_UPDATE_DATA: {
            const { applicationContainer, container, data } = action as UpdateDataAction;
            return {
                ...state,
                [applicationContainer]: {
                    ...state[applicationContainer],
                    [container]: {
                        ...state[applicationContainer][container],
                        ...data
                    }
                }
            };
        }

        default: {
            return { ...state };
        }
    }
}

export { reducer as csrReducer };