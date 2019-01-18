import { Dispatch } from 'redux';
import { startTimer, stopTimer, pauseLessonStats, unpauseLessonStats } from './actions';

export const onStartTimer = (): any => ( dispatch: Dispatch ) => (
    dispatch( startTimer() )
);

export const onStopTimer = (): any => ( dispatch: Dispatch ) => (
    dispatch( stopTimer() )
);

export const onPauseTimer = (): any => ( dispatch: Dispatch ) => (
    dispatch( pauseLessonStats() )
);

export const onUnpauseTimer = (): any => ( dispatch: Dispatch ) => (
    dispatch( unpauseLessonStats() )
);

export default {};
