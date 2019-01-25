import { Reducer } from 'redux';

import { LessonStatsActions } from './actions';
import {
    LessonStatsActionsEnum,
    LessonStatsState
} from './types';

const {
    LESSON_LESSON_STATS_TIMER_START,
    LESSON_LESSON_STATS_TIMER_STOP,
    LESSON_LESSON_STATS_PAUSE,
    LESSON_LESSON_STATS_UNPAUSE
} = LessonStatsActionsEnum;

export const INITIAL_STATE: LessonStatsState = {
    running: false,
    start: 0,
    stop: 0,
    time: 0
};

const reducer: Reducer<LessonStatsState, LessonStatsActions> = ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
        case LESSON_LESSON_STATS_TIMER_START: {
            return {
                ...state,
                running: true,
                start: Date.now(),
                stop: 0
            };
        }

        case LESSON_LESSON_STATS_TIMER_STOP: {
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

        case LESSON_LESSON_STATS_PAUSE: {
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

        case LESSON_LESSON_STATS_UNPAUSE: {
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

export { reducer as lessonStatsReducer };
