import { Action, ActionCreator } from 'redux';
import { LessonStatsActionsEnum } from './types';

const {
    LESSON_LESSON_STATS_TIMER_START,
    LESSON_LESSON_STATS_TIMER_STOP,
    LESSON_LESSON_STATS_PAUSE,
    LESSON_LESSON_STATS_UNPAUSE,
} = LessonStatsActionsEnum;

export const startTimer: ActionCreator<Action> = () => ( {
    type: LESSON_LESSON_STATS_TIMER_START
} );

export const stopTimer: ActionCreator<Action> = () => ( {
    type: LESSON_LESSON_STATS_TIMER_STOP
} );

export const pauseLessonStats: ActionCreator<Action> = () => ( {
    type: LESSON_LESSON_STATS_PAUSE
} );

export const unpauseLessonStats: ActionCreator<Action> = () => ( {
    type: LESSON_LESSON_STATS_UNPAUSE
} );

export default {
    startTimer,
    stopTimer
};

export type LessonStatsActions = Action;
