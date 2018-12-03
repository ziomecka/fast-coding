import { Action, ActionCreator } from 'redux';
import { StatsTypes } from './types';

const {
    COMPONENTS_STATS_TIMER_START,
    COMPONENTS_STATS_TIMER_STOP,
    COMPONENTS_STATS_RESET,
    COMPONENTS_STATS_PAUSE,
    COMPONENTS_STATS_UNPAUSE
} = StatsTypes;

export const startTimer: ActionCreator<Action> = () => ({
    type: COMPONENTS_STATS_TIMER_START
});

export const stopTimer: ActionCreator<Action> = () => ({
    type: COMPONENTS_STATS_TIMER_STOP
});

export const resetStats: ActionCreator<Action> = () => ({
    type: COMPONENTS_STATS_RESET
});

export const pauseStats: ActionCreator<Action> = () => ({
    type: COMPONENTS_STATS_PAUSE
});

export const unpauseStats: ActionCreator<Action> = () => ({
    type: COMPONENTS_STATS_UNPAUSE
});

export default {
    startTimer,
    stopTimer
};

export type StatsActions = Action;