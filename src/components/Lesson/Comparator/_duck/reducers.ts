import { Reducer } from 'redux';

import { ComparatorActions } from './actions';

import { ComparatorTypes } from './types';

const {
    COMPONENTS_COMPARATOR_TURNON,
    COMPONENTS_COMPARATOR_REGISTER_NEW_KEY,
    COMPONENTS_COMPARATOR_REGISTER_ERROR,
    COMPONENTS_COMPARATOR_REGISTER_BACKSPACE,
    COMPONENTS_COMPARATOR_CORRECT_ERROR,
    COMPONENTS_COMPARATOR_RESET
} = ComparatorTypes;

/**
 * @param errors - Errors that are still not corrected
 * @param allErrors - All errors that were made, no matter if corrected
 */
export const INITIAL_STATE: ComparatorState = {
    currentSignIndex: -1,
    errors: [],
    allErrors: [],
    turnedOn: false,
    correctedErrors: []
};

const reducer: Reducer<ComparatorState, ComparatorActions> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case COMPONENTS_COMPARATOR_REGISTER_NEW_KEY: {
            return {
                ...state,
                currentSignIndex: state.currentSignIndex + 1
            };
        }

        case COMPONENTS_COMPARATOR_REGISTER_ERROR: {
            return {
                ...state,
                errors: [ ...state.errors, state.currentSignIndex + 1 ],
                currentSignIndex: state.currentSignIndex + 1
            };
        }

        case COMPONENTS_COMPARATOR_REGISTER_BACKSPACE: {
            return {
                ...state,
                currentSignIndex: state.currentSignIndex - 1
            };
        }

        case COMPONENTS_COMPARATOR_CORRECT_ERROR: {
            return {
                ...state,
                errors: [ ...state.errors.slice(0, state.errors.length - 1) ],
                // @ts-ignore
                correctedErrors: [ ...action.correctedErrors ],
                currentSignIndex: state.currentSignIndex - 1
            };
        }

        case COMPONENTS_COMPARATOR_TURNON: {
            return {
                ...state,
                turnedOn: true
            };
        }

        case COMPONENTS_COMPARATOR_RESET: {
            return { ...INITIAL_STATE };
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
    turnedOn: boolean;
    correctedErrors: number[];
};