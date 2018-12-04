import { Dispatch } from 'redux';
import { ApplicationState } from '../../../../../_reducers';

import { ApplicationContainers, ComponentsContainers, AppRoutes } from '../../../../../_common/';

const { components } = ApplicationContainers;
const { comparator, lesson } = ComponentsContainers;
const { lessons } = AppRoutes;

import {
    registerNewKey,
    registerError,
    registerBackspace,
    correctError,
} from '../actions';

import { onNotEndingLesson } from '../../../_duck/operations';

import history from '../../../../../shared/history';
import { onStartLeaving } from '../../../LessonButtons/_duck/operations';

/**
 * @constant {array}
 * [32] - space
 * [48, 90] - digits, letters
 * [96, 111] - numpad
 * [186, 192] - special chars
 * [219, 222] - special chars
 */
export const validCodes = [
    [32, 32],
    [48, 90],
    [96, 111],
    [186, 192],
    [219, 222],
];

export const backspace = 8;
export const escape = 27;

export const isValidCode = (code: number): boolean => {
    return validCodes.some(range => (
        (code >= range[0]) &&
        (code <= range[1])
    ));
};

export const isBackspace = (code: number): boolean => code === backspace;
export const isEscape = (code: number): boolean => code === escape;

export const handleKeyboardDown = (event: KeyboardEvent, dispatch: Dispatch, getState: () => ApplicationState): void => {
    const { key, keyCode } = event;

    /** Do not scroll when space pressed */
    if (keyCode === 32) event.preventDefault();
    if (isValidCode(keyCode)) handleKeyDown(key, dispatch, getState);
    if (isBackspace(keyCode)) handleBackSpace(dispatch, getState);
    if (isEscape(keyCode)) handleEscape(dispatch, getState);
};

export const handleBackSpace = (dispatch: Dispatch, getState: () => ApplicationState): void => {
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

export const handleKeyDown = (key: string, dispatch: Dispatch, getState: () => ApplicationState): void => {
    let state = getState()[components];
    let { errors, allErrors, currentSignIndex } = state[comparator];
    let { lessonText: text } = state[lesson];

    /** currentSignIndex cannot be higher then text.length - 1 */
    const nextCurrentSignIndex = (currentSignIndex + 1 > text.length - 1)
        ? currentSignIndex
        : currentSignIndex + 1;

        const expectedSign = state[lesson].text[nextCurrentSignIndex];

    if (key !== expectedSign) {
        /** Add to all errors only if not already included */
        if (!allErrors.includes(nextCurrentSignIndex)) {
            allErrors.push(nextCurrentSignIndex);
        }

        errors.push(nextCurrentSignIndex);

        dispatch(registerError(errors, allErrors, nextCurrentSignIndex ));
    } else {
        dispatch(registerNewKey(nextCurrentSignIndex));
    }

    state = null; // TODO GC?
    allErrors = null;
};

const handleEscape = (dispatch: Dispatch, getState: () => ApplicationState): void => {
    if (getState()[components][comparator].currentSignIndex >= 0) {
        dispatch(onStartLeaving());
    } else {
        history.push(lessons);
    }
};


export default {
    isValidCode,
    isBackspace,
    isEscape,
    handleKeyboardDown,
    handleBackSpace
};