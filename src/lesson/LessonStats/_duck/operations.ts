import { Dispatch } from 'redux';
import { startTimer, stopTimer, pauseLessonStats, unpauseLessonStats } from './actions';
import { onKeepState } from '@lesson/Lesson/';
import { LocalStorageItemEnum } from '@appTypes';
import { LessonContainersEnum } from '@lessonTypes';

const { lessonStats: localStorageItem } = LocalStorageItemEnum;
const { lessonStats: container } = LessonContainersEnum;

export const onStartTimer = (): any => ( dispatch: Dispatch ) => {
    dispatch( startTimer() );
    return dispatch( onKeepState( { container, localStorageItem } ) );
};

export const onStopTimer = (): any => ( dispatch: Dispatch ) => {
    dispatch( stopTimer() );
    return dispatch( onKeepState( { container, localStorageItem } ) );
};

export const onPauseTimer = (): any => ( dispatch: Dispatch ) => {
    dispatch( pauseLessonStats() );
    return dispatch( onKeepState( { container, localStorageItem } ) );
};

export const onUnpauseTimer = (): any => ( dispatch: Dispatch ) => {
    dispatch( unpauseLessonStats( localStorageItem ) );
    return dispatch( onKeepState( { container, localStorageItem } ) );
};

export default {};
