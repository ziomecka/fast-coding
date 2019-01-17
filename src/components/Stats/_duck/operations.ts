import { Dispatch } from 'redux';
import { startTimer, stopTimer, pauseStats, unpauseStats } from './actions';
import { onKeepState } from '@components/Lesson/';
import { LocalStorageItemEnum } from '@appTypes';
import { ComponentsContainersEnum } from '@componentsTypes';

const { stats } = LocalStorageItemEnum;
const { comparator } = ComponentsContainersEnum;

export const onStartTimer = (): any => ( dispatch: Dispatch ) => {
    dispatch( startTimer() );
    return dispatch( onKeepState( stats, comparator[ stats ] ) );
};

export const onStopTimer = (): any => ( dispatch: Dispatch ) => {
    dispatch( stopTimer() );
    return dispatch( onKeepState( stats, comparator[ stats ] ) );
};

export const onPauseTimer = (): any => ( dispatch: Dispatch ) => {
    dispatch( pauseStats() );
    return dispatch( onKeepState( stats, comparator[ stats ] ) );
};

export const onUnpauseTimer = (): any => ( dispatch: Dispatch ) => {
    dispatch( unpauseStats( stats ) );
    return dispatch( onKeepState( stats, comparator[ stats ] ) );
};

export default {};
