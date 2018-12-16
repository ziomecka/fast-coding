import { Dispatch } from 'redux';
import { ApplicationContainers, ComponentsContainers, AppRoutes, ThunkGetStateType, LocalStorageItemTypes } from '../../../../_common';

const { components } = ApplicationContainers;
const { comparator, lesson } = ComponentsContainers;
const { lessons } = AppRoutes;

import history from '../../../../shared/history';

import { onKeepState, onRemoveState } from './restore.state';

import {
    resetLesson,
    endingLesson,
    notEndingLesson,
    endLesson,
    restartLesson,
    pauseLesson,
    unpauseLesson,
    startLesson
} from './../actions';

import { default as comparatorOperations } from '../../Comparator/_duck/operations/index';

const { onResetComparator,
        onPauseComparator,
        onUnpauseComparator,
        onTurnOffComparator
    } = comparatorOperations;

import { resetStats } from '../../Stats/_duck/actions';
import { onPauseTimer, onUnpauseTimer } from '../../Stats/_duck/operations';
import { resetDraggableLessonButtons } from '../../LessonButtons/_duck/actions';

/** Keyboard listener imports */
import * as manageKeydownListeners  from '../../../../app/KeyboardListener/_duck/operations';
const { lesson: container } = ComponentsContainers;

/** Time to correct the last sign */
const waitForLastSign = 800;
let timeout;

export const onStartLesson = (): any => async (dispatch: Dispatch) => {
    await dispatch(startLesson());
    return dispatch(onKeepState(LocalStorageItemTypes.lesson, lesson));
};

export const onEndLesson = (): any => (dispatch: Dispatch) => {
    clearTimeout(timeout);
    let answer = dispatch(endLesson());
    if (answer) {
        addEscapeReturnListener(dispatch);
        document.getElementById("lessonStats").scrollIntoView(true);
        dispatch(onKeepState(LocalStorageItemTypes.lesson, lesson));
        dispatch(onKeepState(LocalStorageItemTypes.comparator, comparator));
    }
};

// let manageKeyDownListeners = keydownListeners();

const escapeReturnListener = (e: KeyboardEvent, dispatch: Dispatch) => {
    if (e.keyCode === 27) {
        // TODO reset everything
        history.push(lessons);
    }

    if (e.keyCode === 13) {
        dispatch(onRestartLesson());
    }
}

let listenerId;

const addEscapeReturnListener = (dispatch: Dispatch): number => {
    listenerId = dispatch(manageKeydownListeners.onAddListener({
        container,
        listener: [ 'keydown', (e: KeyboardEvent) => escapeReturnListener(e, dispatch) ]
    }));
    return listenerId;
};

const removeAllKeyDownListeners = (dispatch: Dispatch): boolean => {
    return dispatch(manageKeydownListeners.onRemoveListener({ container, listenerId }));
};

const _endLesson = (dispatch, getState) => {
    let state = getState()[components];

    if ( (state[lesson].lessonText.length - 1) <= state[comparator].currentSignIndex) {
        /** Comparator ends lesson after switching off keyboardListener and stats */
        dispatch(onTurnOffComparator());
    }
    clearTimeout(timeout);
};

export const onNotEndingLesson = (): any => (dispatch: Dispatch, getState: ThunkGetStateType) => {
    clearTimeout(timeout);
    dispatch(notEndingLesson());
    dispatch(onKeepState(LocalStorageItemTypes.lesson, lesson));
};

export const onEndingLesson = (): any => (dispatch: Dispatch, getState: ThunkGetStateType) => {
    const { ending } = getState()[components][lesson];

    if (!ending) {
        dispatch(endingLesson());

        timeout = setTimeout(
            () => _endLesson(dispatch, getState),
            waitForLastSign
        );
    }
};

export const onReset = (): any => (dispatch: Dispatch) => {
    dispatch(onResetComparator());
    dispatch(resetStats());
    dispatch(resetLesson());
    dispatch(resetDraggableLessonButtons());
    clearTimeout(timeout);
    removeAllKeyDownListeners(dispatch);

    dispatch(onRemoveState(LocalStorageItemTypes.lesson));
    dispatch(onRemoveState(LocalStorageItemTypes.comparator));
    dispatch(onRemoveState(LocalStorageItemTypes.stats));
};

export const onRestartLesson = (): any => (dispatch: Dispatch): void => {
    dispatch(onResetComparator());
    dispatch(resetStats());
    dispatch(restartLesson());
    clearTimeout(timeout);
    removeAllKeyDownListeners(dispatch);
    dispatch(onKeepState(LocalStorageItemTypes.lesson, lesson));
    dispatch(onKeepState(LocalStorageItemTypes.comparator, comparator));
};

export const onPauseLesson = (listener?): any => (dispatch: Dispatch): void => {
    dispatch(onPauseTimer());
    dispatch(onPauseComparator(listener));
    dispatch(pauseLesson());
    dispatch(onKeepState(LocalStorageItemTypes.lesson, lesson));
    dispatch(onKeepState(LocalStorageItemTypes.comparator, comparator));
};

export const onUnpauseLesson = (): any => (dispatch: Dispatch): void => {
    dispatch(onUnpauseComparator());
    dispatch(unpauseLesson());
    dispatch(onUnpauseTimer());
    dispatch(onKeepState(LocalStorageItemTypes.lesson, lesson));
    dispatch(onKeepState(LocalStorageItemTypes.comparator, comparator));
};

export default {
    onEndingLesson,
    onNotEndingLesson,
    onEndLesson,
    onUnpauseLesson,
    onReset
};