import { Action, ActionCreator } from 'redux';
import { LessonStatsActionsEnum, LessonStatsState } from './types';

const {
    COMPONENTS_LESSON_STATS_TIMER_START,
    COMPONENTS_LESSON_STATS_TIMER_STOP,
    COMPONENTS_LESSON_STATS_RESET,
    COMPONENTS_LESSON_STATS_PAUSE,
    COMPONENTS_LESSON_STATS_UNPAUSE,
    COMPONENTS_LESSON_STATS_RESTORE_STATE
} = LessonStatsActionsEnum;

export const startTimer: ActionCreator<Action> = () => ( {
    type: COMPONENTS_LESSON_STATS_TIMER_START
} );

export const stopTimer: ActionCreator<Action> = () => ( {
    type: COMPONENTS_LESSON_STATS_TIMER_STOP
} );

export const resetLessonStats: ActionCreator<Action> = () => ( {
    type: COMPONENTS_LESSON_STATS_RESET
} );

export const pauseLessonStats: ActionCreator<Action> = () => ( {
    type: COMPONENTS_LESSON_STATS_PAUSE
} );

export const unpauseLessonStats: ActionCreator<Action> = () => ( {
    type: COMPONENTS_LESSON_STATS_UNPAUSE
} );

export const restoreState: ActionCreator<RestoreStateAction> = ( state: LessonStatsState ) => ( {
    type: COMPONENTS_LESSON_STATS_RESTORE_STATE,
    state
} );

export interface RestoreStateAction extends Action {
    state: LessonStatsState
}
export default {
    startTimer,
    stopTimer
};

export type LessonStatsActions = Action;
