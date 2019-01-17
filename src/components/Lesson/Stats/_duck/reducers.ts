import { Reducer } from 'redux';

import { StatsActions } from './actions';
import {
    StatsActionsEnum,
    StatsState
} from './types';

const {
    COMPONENTS_STATS_TIMER_START,
    COMPONENTS_STATS_TIMER_STOP,
    COMPONENTS_STATS_RESET,
    COMPONENTS_STATS_PAUSE,
    COMPONENTS_STATS_UNPAUSE
} = StatsActionsEnum;

export const INITIAL_STATE: StatsState = {
    running: false,
    start: 0,
    stop: 0,
    time: 0
};

const reducer: Reducer<StatsState, StatsActions> = ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
        case COMPONENTS_STATS_TIMER_START: {
            return {
                ...state,
                running: true,
                start: Date.now(),
                stop: 0
            };
        }

        case COMPONENTS_STATS_TIMER_STOP: {
            const { start, time } = state;

            /** Set time once. In case page is refreshed */
            return {
                ...state,
                running: false,
                stop: 0,
                start: 0,
                time: start
                    ? Date.now() - start + time
                    : time,
            };
        }

        case COMPONENTS_STATS_RESET: {
            return { ...INITIAL_STATE };
        }

        case COMPONENTS_STATS_PAUSE: {
            const { start, time } = state;

            /** Time: check if start exists
            *  Needed in case browser's back button is pressed
            *  because then the start becomes 0.
            *  Also in case the page is refreshed
            */
            return {
                ...state,
                time: start
                    ? Date.now() - start + time
                    : time,
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
