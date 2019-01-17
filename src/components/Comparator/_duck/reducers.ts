import { Reducer } from 'redux';

import { ComparatorActions, RestoreStateAction } from './actions';

import { ComparatorActionsEnum } from './types';

const {
    COMPONENTS_COMPARATOR_REGISTER_NEW_KEY,
    COMPONENTS_COMPARATOR_REGISTER_ERROR,
    COMPONENTS_COMPARATOR_REGISTER_BACKSPACE,
    COMPONENTS_COMPARATOR_CORRECT_ERROR,
    COMPONENTS_COMPARATOR_RESET,
    COMPONENTS_COMPARATOR_RESTORE_STATE
} = ComparatorActionsEnum;

/**
 * @param errors - Errors that are still not corrected
 * @param allErrors - All errors that were made, no matter if corrected
 */
export const INITIAL_STATE: ComparatorState = {
    currentSignIndex: -1,
    errors: [],
    allErrors: [],
    correctedErrors: [],
};

const reducer: Reducer<ComparatorState, ComparatorActions> = ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
        case COMPONENTS_COMPARATOR_REGISTER_NEW_KEY: {
            return {
                ...state,
                // @ts-ignore
                currentSignIndex: action.currentSignIndex
            };
        }

        case COMPONENTS_COMPARATOR_REGISTER_ERROR: {
            return {
                ...state,
                // @ts-ignore
                errors: [ ...action.errors ],
                // @ts-ignore
                allErrors: [ ...action.allErrors ],
                // @ts-ignore
                currentSignIndex: action.currentSignIndex
            };
        }

        case COMPONENTS_COMPARATOR_REGISTER_BACKSPACE: {
            return {
                ...state,
                currentSignIndex: Math.max( -1, state.currentSignIndex - 1 )
            };
        }

        case COMPONENTS_COMPARATOR_CORRECT_ERROR: {
            return {
                ...state,
                errors: [ ...state.errors.slice( 0, state.errors.length - 1 ) ],
                // @ts-ignore
                correctedErrors: [ ...action.correctedErrors ],
                currentSignIndex: state.currentSignIndex - 1
            };
        }

        case COMPONENTS_COMPARATOR_RESET: {
            return {
                ...state,
                errors: [],
                allErrors: [],
                correctedErrors: [],
                currentSignIndex: -1
            };
        }

        case COMPONENTS_COMPARATOR_RESTORE_STATE: {
            return {
                ...state,
                ...( action as RestoreStateAction ).state
            };
        }

        default: {
            return { ...state };
        }
    }
};

export { reducer as comparatorReducer };

export interface ComparatorState {
    currentSignIndex: number;
    errors: number[];
    allErrors: number[];
    correctedErrors: number[];
}
