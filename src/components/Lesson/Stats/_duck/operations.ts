import { Dispatch } from 'redux';
import { startTimer, stopTimer, pauseStats, unpauseStats } from './actions';
import { onKeepState } from '../../_duck/operations/restore.state';
import { LocalStorageItemTypes } from '@applicationTypes';
import { ComparatorContainersEnum, ComponentsContainers } from '@componentsTypes';

const { stats } = LocalStorageItemTypes;
const { comparator } = ComponentsContainers;
const { stats: statsContainer } = ComparatorContainersEnum;

export const onStartTimer = (): any => (dispatch: Dispatch) => {
    dispatch(startTimer());
    return dispatch(onKeepState(stats, comparator[statsContainer]));
};

export const onStopTimer = (): any => (dispatch: Dispatch) => {
    dispatch(stopTimer());
    return dispatch(onKeepState(stats, comparator[statsContainer]));
};

export const onPauseTimer = (): any => (dispatch: Dispatch) => {
    dispatch(pauseStats());
    return dispatch(onKeepState(stats, comparator[statsContainer]));
};

export const onUnpauseTimer = (): any => (dispatch: Dispatch) => {
    dispatch(unpauseStats(stats));
    return dispatch(onKeepState(stats, comparator[statsContainer]));
};

export default {};