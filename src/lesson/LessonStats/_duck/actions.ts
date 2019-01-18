import { Action, ActionCreator } from 'redux';
import { LessonStatsActionsEnum, LessonStatsState } from './types';

const {
    LESSON_LESSON_STATS_TIMER_START,
    LESSON_LESSON_STATS_TIMER_STOP,
    LESSON_LESSON_STATS_RESET,
    LESSON_LESSON_STATS_PAUSE,
    LESSON_LESSON_STATS_UNPAUSE,
    LESSON_LESSON_STATS_RESTORE_STATE
} = LessonStatsActionsEnum;

export const startTimer: ActionCreator<Action> = () => ( {
    type: LESSON_LESSON_STATS_TIMER_START
} );

export const stopTimer: ActionCreator<Action> = () => ( {
    type: LESSON_LESSON_STATS_TIMER_STOP
} );

export const resetLessonStats: ActionCreator<Action> = () => ( {
    type: LESSON_LESSON_STATS_RESET
} );

export const pauseLessonStats: ActionCreator<Action> = () => ( {
    type: LESSON_LESSON_STATS_PAUSE
} );

export const unpauseLessonStats: ActionCreator<Action> = () => ( {
    type: LESSON_LESSON_STATS_UNPAUSE
} );

export const restoreState: ActionCreator<RestoreStateAction> = ( state: LessonStatsState ) => ( {
    type: LESSON_LESSON_STATS_RESTORE_STATE,
    state
} );

/**
 * Actions that require keeping the state in localStorage
 * Used in Lesson global reducer
*/
export const stateKeepActions = [
    LessonStatsActionsEnum.LESSON_LESSON_STATS_PAUSE,
    LessonStatsActionsEnum.LESSON_LESSON_STATS_RESET,
    LessonStatsActionsEnum.LESSON_LESSON_STATS_TIMER_START,
    LessonStatsActionsEnum.LESSON_LESSON_STATS_TIMER_STOP,
    LessonStatsActionsEnum.LESSON_LESSON_STATS_UNPAUSE,
    // LessonStatsActionsEnum.LESSON_LESSON_STATS_RESTORE_STATE
];

export interface RestoreStateAction extends Action {
    state: LessonStatsState
}
export default {
    startTimer,
    stopTimer
};

export type LessonStatsActions = Action;
