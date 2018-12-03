import { Dispatch } from 'redux';
import { ApplicationState } from '../../../_reducers';
import { ApplicationContainers, ComponentsContainers, AppRoutes } from '../../../_common';

const { components } = ApplicationContainers;
const { comparator, lesson } = ComponentsContainers;
const { lessons } = AppRoutes;

import history from '../../../shared/history';

import {
    resetLesson,
    endingLesson,
    notEndingLesson,
    endLesson,
    restartLesson,
    pauseLesson,
    unpauseLesson
} from './actions';

import { onResetComparator, onPauseComparator, onUnpauseComparator } from '../Comparator/_duck/operations';
import { onTurnOffComparator } from '../Comparator/_duck/operations';
import { resetStats } from '../Stats/_duck/actions';
import { onPauseTimer, onUnpauseTimer } from '../Stats/_duck/operations';
import { resetDraggableLessonButtons } from '../LessonButtons/_duck/actions';

import keydownListeners from '../../../shared/keydown.listener';

/** Time to correct the last sign */
const waitForLastSign = 800;
let timeout;

export const onEndLesson = (): any => (dispatch: Dispatch) => {
    clearTimeout(timeout);
    let answer = dispatch(endLesson());
    if (answer) {
        addEscapeReturnListener(dispatch);
        document.getElementById("lessonStats").scrollIntoView(true);
    }
};

let manageKeyDownListeners = keydownListeners();

const escapeReturnListener = (e: KeyboardEvent, dispatch: Dispatch) => {
    if (e.keyCode === 27) {
        // TODO reset everything
        history.push(lessons);
    }

    if (e.keyCode === 13) {
        dispatch(onRestartLesson());
    }
}

const addEscapeReturnListener = (dispatch: Dispatch) => {
    manageKeyDownListeners.addKeyDownListener((e: KeyboardEvent) => escapeReturnListener(e, dispatch));
};

const removeAllKeyDownListeners = () => {
    manageKeyDownListeners.removeAllKeyDownListeners();
};

const _endLesson = (dispatch, getState) => {
    let state = getState()[components];

    if ( (state[lesson].text.length - 1) === state[comparator].currentSignIndex) {
        /** Comparator ends lesson after switching off keyboardListener and stats */
        dispatch(onTurnOffComparator());
    }
    clearTimeout(timeout);
};

export const onNotEndingLesson = (): any => (dispatch: Dispatch, getState: () => ApplicationState) => {
    clearTimeout(timeout);
    dispatch(notEndingLesson());
};

export const onEndingLesson = (): any => (dispatch: Dispatch, getState: () => ApplicationState) => {
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
    removeAllKeyDownListeners();
};

export const onRestartLesson = (): any => (dispatch: Dispatch): void => {
    dispatch(onResetComparator());
    dispatch(resetStats());
    dispatch(restartLesson());
    clearTimeout(timeout);
    removeAllKeyDownListeners();
};

export const onPauseLesson = (listener?): any => (dispatch: Dispatch): void => {
    dispatch(onPauseTimer());
    dispatch(onPauseComparator(listener));
    dispatch(pauseLesson());
};

export const onUnpauseLesson = (): any => (dispatch: Dispatch): void => {
    dispatch(onUnpauseComparator());
    dispatch(unpauseLesson());
    dispatch(onUnpauseTimer());
};

export default {
    onEndingLesson,
    onReset
};