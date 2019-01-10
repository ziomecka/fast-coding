import { Reducer } from 'redux';

import { CSRActionsEnum } from './types';
import { CSRActions, ReportErrorAction, ChangeLoadingStateAction, UpdateDataAction } from './actions';
import { ApplicationState } from '@appStore';

const {
    APP_CSR_CHANGE_LOADING_STATE,
    APP_CSR_REPORT_ERROR,
    APP_CSR_UPDATE_DATA
} = CSRActionsEnum;

import { INITIAL_STATE as APPLICATION_INITIAL_STATE } from '@src/_reducers/';

export const INITIAL_STATE: ICSRState = {
    ...APPLICATION_INITIAL_STATE,
    // loading: false,
    // error: '',
};

const reducer: Reducer<ICSRState, CSRActions> = ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
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
};

export interface ICSRState extends ApplicationState {
    // loading: boolean;
    // error: string;
}

export { reducer as csrReducer };
