import { Dispatch } from 'redux';
import { startTimer, stopTimer, pauseLessonStats, unpauseLessonStats } from './actions';
import { onKeepState } from '@components/Lesson/';
import { LocalStorageItemEnum } from '@appTypes';
import { ComponentsContainersEnum } from '@componentsTypes';

const { lessonStats } = LocalStorageItemEnum;
const { comparator } = ComponentsContainersEnum;

export const onStartTimer = (): any => ( dispatch: Dispatch ) => {
    dispatch( startTimer() );
    return dispatch( onKeepState( lessonStats, comparator[ lessonStats ] ) );
};

export const onStopTimer = (): any => ( dispatch: Dispatch ) => {
    dispatch( stopTimer() );
    return dispatch( onKeepState( lessonStats, comparator[ lessonStats ] ) );
};

export const onPauseTimer = (): any => ( dispatch: Dispatch ) => {
    dispatch( pauseLessonStats() );
    return dispatch( onKeepState( lessonStats, comparator[ lessonStats ] ) );
};

export const onUnpauseTimer = (): any => ( dispatch: Dispatch ) => {
    dispatch( unpauseLessonStats( lessonStats ) );
    return dispatch( onKeepState( lessonStats, comparator[ lessonStats ] ) );
};

export default {};
