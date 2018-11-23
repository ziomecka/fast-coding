import { Dispatch } from 'redux';
import { ApplicationState } from '../../../../_reducers';

import { ApplicationContainers, ComponentsContainers } from '../../../../_common/';

const { components } = ApplicationContainers;
const { comparator, lesson } = ComponentsContainers;

import {
    registerNewKey,
    registerError,
    registerBackspace,
    correctError,
} from './actions';

import { startTimer, stopTimer } from '../../Stats/_duck/actions';
import { turnOffKeyboardListener } from '../KeyboardListener/_duck/actions';
import { onEndLesson, onNotEndingLesson } from '../../_duck/operations';

export const onTurnOnComparator = (): any => (dispatch: Dispatch) => {
    dispatch(startTimer());
};

export const onTurnOffComparator = (): any => async (dispatch: Dispatch): Promise<Boolean> => {
    let keyboardListenerTurnedOff = await dispatch(turnOffKeyboardListener());
    let timerStopped = await dispatch(stopTimer());

    if (keyboardListenerTurnedOff && timerStopped) {
        dispatch(onEndLesson());
        keyboardListenerTurnedOff = null; // TODO GC
        timerStopped = null; // TODO GC
        return true;
    }
};

export const onHandleBackSpace = (): any => (dispatch: Dispatch, getState: () => ApplicationState): void => {
    let state = getState()[components];

    let { errors, correctedErrors, currentSignIndex } = state[comparator];
    let { ending } = state[lesson];

    const wasAnError = errors[errors.length - 1] === currentSignIndex;

    if (wasAnError) {
        /** Add to corrected errors only if not already included */
        if (!correctedErrors.includes(currentSignIndex)) {
            correctedErrors.push(currentSignIndex);
        }

        dispatch(correctError(correctedErrors));
    } else {
        dispatch(registerBackspace());
        if (ending) dispatch(onNotEndingLesson());
    }

    state = null; // TODO GC?
    errors = null; // TODO GC?
    correctedErrors = null;
};

export const onHandleKeyDown = (key: string): any => (dispatch: Dispatch, getState: () => ApplicationState): void => {
    let state = getState()[components];
    let { errors, allErrors, currentSignIndex } = state[comparator];
    let { text } = state[lesson];

    /** currentSignIndex cannot be higher then text.length - 1 */
    const nextCurrentSignIndex = (currentSignIndex + 1 > text.length - 1)
        ? currentSignIndex
        : currentSignIndex + 1;

        const expectedSign = state[lesson].text[nextCurrentSignIndex];

    if (key !== expectedSign) {
        /** Add to all errors only if not already included */
        if (!allErrors.includes(nextCurrentSignIndex)) {
            allErrors.push(nextCurrentSignIndex);
            errors.push(nextCurrentSignIndex);
        }

        dispatch(registerError(errors, allErrors, nextCurrentSignIndex ));
    } else {
        dispatch(registerNewKey(nextCurrentSignIndex));
    }

    state = null; // TODO GC?
    allErrors = null;
};

export default {
    onHandleBackSpace,
    onHandleKeyDown,
    onTurnOnComparator,
    onTurnOffComparator
};