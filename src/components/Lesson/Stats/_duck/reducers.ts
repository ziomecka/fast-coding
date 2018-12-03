import { Reducer } from 'redux';

import { StatsActions } from './actions';
import { StatsTypes } from './types';

const {
    COMPONENTS_STATS_TIMER_START,
    COMPONENTS_STATS_TIMER_STOP,
    COMPONENTS_STATS_RESET,
    COMPONENTS_STATS_PAUSE,
    COMPONENTS_STATS_UNPAUSE
} = StatsTypes;

export const INITIAL_STATE: StatsState = {
    running: false,
    start: 0,
    stop: 0,
    time: 0
};

const reducer: Reducer<StatsState, StatsActions> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case COMPONENTS_STATS_TIMER_START: {
            return {
                ...state,
                running: true,
                start: Date.now(),
                stop: 0
            };
        }

        case COMPONENTS_STATS_TIMER_STOP: {
            return {
                ...state,
                running: false,
                stop: Date.now()
            };
        }

        case COMPONENTS_STATS_RESET: {
            return { ...INITIAL_STATE };
        }

        case COMPONENTS_STATS_PAUSE: {
            return {
                ...state,
                time: Date.now() - state.start + state.time,
                start: 0,
                stop: 0,
                running: false
             };
        }

        case COMPONENTS_STATS_UNPAUSE: {
            return {
                ...state,
                running: true,
                start: Date.now(),
                stop: 0
            };
        }

        default: {
            return { ...state };
        }
    }
};

export { reducer as statsReducer };

export interface StatsState {
    running: boolean;
    start: number;
    stop: number;
    time: number;
};