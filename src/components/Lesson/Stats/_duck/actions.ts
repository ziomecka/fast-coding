import { Action, ActionCreator } from 'redux';
import { StatsActionsEnum } from './types';
import { StatsState } from './reducers';

const {
    COMPONENTS_STATS_TIMER_START,
    COMPONENTS_STATS_TIMER_STOP,
    COMPONENTS_STATS_RESET,
    COMPONENTS_STATS_PAUSE,
    COMPONENTS_STATS_UNPAUSE,
    COMPONENTS_STATS_RESTORE_STATE
} = StatsActionsEnum;

export const startTimer: ActionCreator<Action> = () => ( {
    type: COMPONENTS_STATS_TIMER_START
} );

export const stopTimer: ActionCreator<Action> = () => ( {
    type: COMPONENTS_STATS_TIMER_STOP
} );

export const resetStats: ActionCreator<Action> = () => ( {
    type: COMPONENTS_STATS_RESET
} );

export const pauseStats: ActionCreator<Action> = () => ( {
    type: COMPONENTS_STATS_PAUSE
} );

export const unpauseStats: ActionCreator<Action> = () => ( {
    type: COMPONENTS_STATS_UNPAUSE
} );

export const restoreState: ActionCreator<RestoreStateAction> = ( state: StatsState ) => ( {
    type: COMPONENTS_STATS_RESTORE_STATE,
    state
} );

export interface RestoreStateAction extends Action {
    state: StatsState
}
export default {
    startTimer,
    stopTimer
};

export type StatsActions = Action;