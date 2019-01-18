import { Dispatch } from 'redux';
import { startTimer, stopTimer, pauseLessonStats, unpauseLessonStats } from './actions';
import { onKeepState } from '@lesson/LessonComponent/';

export const onStartTimer = (): any => ( dispatch: Dispatch ) => {
    dispatch( startTimer() );
    return dispatch( onKeepState() );
};

export const onStopTimer = (): any => ( dispatch: Dispatch ) => {
    dispatch( stopTimer() );
    return dispatch( onKeepState() );
};

export const onPauseTimer = (): any => ( dispatch: Dispatch ) => {
    dispatch( pauseLessonStats() );
    return dispatch( onKeepState() );
};

export const onUnpauseTimer = (): any => ( dispatch: Dispatch ) => {
    dispatch( unpauseLessonStats() );
    return dispatch( onKeepState() );
};

export default {};
