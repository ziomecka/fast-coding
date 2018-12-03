import { Dispatch } from 'redux';
import { ApplicationState } from '../../../../_reducers';

import { ApplicationContainers, ComponentsContainers, AppRoutes } from '../../../../_common/';

const { components } = ApplicationContainers;
const { comparator, lesson } = ComponentsContainers;
const { lessons } = AppRoutes;

import {
    registerNewKey,
    registerError,
    registerBackspace,
    correctError,
    resetComparator
} from './actions';

import { onStartTimer, onStopTimer } from '../../Stats/_duck/operations';
import { onEndLesson, onNotEndingLesson, onUnpauseLesson } from '../../_duck/operations';

import history from '../../../../shared/history';
import { onStartLeaving } from '../../LessonButtons/_duck/operations';

const event = 'keydown';
let listeners: [string, EventListenerOrEventListenerObject][] = [];

const handleKeyboardDown = (event: KeyboardEvent, dispatch: Dispatch, getState: () => ApplicationState): void => {
    const { key, keyCode } = event;

    /**
     * @constant {array}
     * [32] - space
     * [48, 90] - digits, letters
     * [96, 111] - numpad
     * [186, 192] - special chars
     * [219, 222] - special chars
     */
    const validCodes = [
        [32, 32],
        [48, 90],
        [96, 111],
        [186, 192],
        [219, 222],
    ];

    const backspace = 8;
    const escape = 27;

    const isValidCode = (code: number): boolean => {
        return validCodes.some(range => (
            (code >= range[0]) &&
            (code <= range[1])
        ));
    };

    const isBackspace = (code: number): boolean => code === backspace;
    const isEscape = (code: number): boolean => code === escape;

    /** Do not scroll when space pressed */
    if (keyCode === 32) event.preventDefault();
    if (isValidCode(keyCode)) handleKeyDown(key, dispatch, getState);
    if (isBackspace(keyCode)) handleBackSpace(dispatch, getState);
    if (isEscape(keyCode)) handleEscape(dispatch, getState);
};

export const onTurnOnComparator = (): any => (dispatch: Dispatch) => {
    dispatch(onStartTimer());
};

export const onTurnOffComparator = (): any => async (dispatch: Dispatch): Promise<Boolean> => {
    listeners.forEach(listener => document.removeEventListener(listener[0], listener[1]));
    listeners = [];

    let timerStopped = await dispatch(onStopTimer());

    if (timerStopped) {
        dispatch(onEndLesson());
        timerStopped = null; // TODO GC
        return true;
    }
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

export const onResetComparator = (): any => (dispatch: Dispatch, getState: () => ApplicationState) => {
    listeners.push([ event, (e: KeyboardEvent) => handleKeyboardDown(e, dispatch, getState) ]);
    document.addEventListener(event, listeners[listeners.length - 1][1]);
    dispatch(resetComparator());
};

export const onAddEventListener = (listener): any => (dispatch: Dispatch, getState: () => ApplicationState) => {
    if (listener) {
        listeners.push([ event, (e: KeyboardEvent) => listener(e, dispatch, getState) ]);
        document.addEventListener(event, listeners[listeners.length - 1][1]);
    }
};

export const onRemoveEventListener = (): any => () => {
    listeners.forEach(listener => document.removeEventListener(listener[0], listener[1]));
    listeners = [];
};

export const unpauseLessonOnJustType = (event: KeyboardEvent, dispatch: Dispatch, getState: () => ApplicationState): void => {
    const { keyCode } = event;

    /** Do not scroll when space pressed */
    if (keyCode === 32) event.preventDefault();

    /** If valid code or backspace then unpause and handle keydown */
    if (isValidCode(keyCode) || isBackspace(keyCode)) {
        dispatch(onUnpauseLesson());
        handleKeyboardDown(event, dispatch, getState);
    };
};

export const unpauseLessonOnEsc = (event: KeyboardEvent, dispatch: Dispatch, getState: () => ApplicationState): void => {
    const { keyCode } = event;

    /** Do not scroll when space pressed */
    if (keyCode === 32) event.preventDefault();

    /** If valid code or backspace then unpause and handle keydown */
    if (keyCode === 27) {
        dispatch(onUnpauseLesson());
    };
};

export const onPauseComparator = (eventListener? ): any => (dispatch: Dispatch) => {
    dispatch(onRemoveEventListener());
    /** Add eydown listener: if valid keyCode or backSpace then unpause lesson */
    if (eventListener) {
        dispatch(onAddEventListener(eventListener));
    }
};

export const onUnpauseComparator = (): any => (dispatch: Dispatch) => {
    dispatch(onRemoveEventListener());
    dispatch(onAddEventListener(handleKeyboardDown));
};

export default {
    onTurnOnComparator,
    onTurnOffComparator,
    onResetComparator,
    onAddEventListener,
    onRemoveEventListener
};