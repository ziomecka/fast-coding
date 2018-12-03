import { Dispatch } from 'redux';
import { startTimer, stopTimer, pauseStats, unpauseStats } from './actions';


export const onStartTimer = (): any => (dispatch: Dispatch) => {
    dispatch(startTimer());
};

export const onStopTimer = (): any => (dispatch: Dispatch) => {
    return dispatch(stopTimer());
};

export const onPauseTimer = (): any => (dispatch: Dispatch) => {
    return dispatch(pauseStats());
};

export const onUnpauseTimer = (): any => (dispatch: Dispatch) => {
    return dispatch(unpauseStats());
};

export default {};