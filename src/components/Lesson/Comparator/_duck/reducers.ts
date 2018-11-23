import { Reducer } from 'redux';

import { ComparatorActions } from './actions';

import { ComparatorTypes } from './types';
import { KeyboardListenerTypes } from '../KeyboardListener/_duck/types';
import { StatsTypes } from '../../Stats/_duck/types';

import {
    keyboardListenerReducer,
    KeyboardListenerState,
    INITIAL_STATE as KEYBOARD_LISTENER_INITIAL_STATE
} from '../KeyboardListener/_duck/reducers'

import {
    statsReducer,
    StatsState,
    INITIAL_STATE as STATS_INITIAL_STATE
} from '../../Stats/_duck/reducers'

import { ComparatorContainers } from '../_common/index';
const { keyboardListener, stats } = ComparatorContainers;

const {
    COMPONENTS_COMPARATOR_REGISTER_NEW_KEY,
    COMPONENTS_COMPARATOR_REGISTER_ERROR,
    COMPONENTS_COMPARATOR_REGISTER_BACKSPACE,
    COMPONENTS_COMPARATOR_CORRECT_ERROR,
    COMPONENTS_COMPARATOR_RESET
} = ComparatorTypes;

const {
    COMPONENTS_KEYBOARD_LISTENER_TURN_OFF,
    COMPONENTS_KEYBOARD_LISTENER_RESET
} = KeyboardListenerTypes;

const {
    COMPONENTS_STATS_TIMER_START,
    COMPONENTS_STATS_TIMER_STOP,
    COMPONENTS_STATS_RESET
} = StatsTypes;

/**
 * @param errors - Errors that are still not corrected
 * @param allErrors - All errors that were made, no matter if corrected
 */
export const INITIAL_STATE: ComparatorState = {
    currentSignIndex: -1,
    errors: [],
    allErrors: [],
    correctedErrors: [],
    [keyboardListener]: { ...KEYBOARD_LISTENER_INITIAL_STATE },
    [stats]: { ...STATS_INITIAL_STATE }
};

const reducer: Reducer<ComparatorState, ComparatorActions> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
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

        case COMPONENTS_KEYBOARD_LISTENER_TURN_OFF:
        case COMPONENTS_KEYBOARD_LISTENER_RESET: {
            return {
                ...state,
                [keyboardListener]: keyboardListenerReducer(state[keyboardListener], action)
            };
        }

        case COMPONENTS_STATS_TIMER_START:
        case COMPONENTS_STATS_TIMER_STOP:
        case COMPONENTS_STATS_RESET: {
            return {
                ...state,
                [stats]: statsReducer(state[stats], action)
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
    [keyboardListener]: KeyboardListenerState;
    [stats]: StatsState;
};