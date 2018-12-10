





import { Dispatch } from 'redux';
import { ThunkGetStateType } from '../../../../../_common';

import { resetComparator } from '../actions';

import { onStartTimer, onStopTimer } from '../../../Stats/_duck/operations';
import { onEndLesson, onUnpauseLesson } from '../../../_duck/operations/life';

import { default as handleKeys } from './handle.keys';
const { handleKeyboardDown, isValidCode, isBackspace } = handleKeys;

const event = 'keydown';
let listeners: [string, EventListenerOrEventListenerObject][] = [];

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

export const onResetComparator = (): any => (dispatch: Dispatch, getState: ThunkGetStateType) => {
    listeners.push([ event, (e: KeyboardEvent) => handleKeyboardDown(e, dispatch, getState) ]);
    document.addEventListener(event, listeners[listeners.length - 1][1]);
    dispatch(resetComparator());
};

export const onAddEventListener = (listener): any => (dispatch: Dispatch, getState: ThunkGetStateType) => {
    if (listener) {
        listeners.push([ event, (e: KeyboardEvent) => listener(e, dispatch, getState) ]);
        document.addEventListener(event, listeners[listeners.length - 1][1]);
    }
};

export const onRemoveEventListener = (): any => () => {
    listeners.forEach(listener => document.removeEventListener(listener[0], listener[1]));
    listeners = [];
};

export const unpauseLessonOnJustType = (event: KeyboardEvent, dispatch: Dispatch, getState: ThunkGetStateType): void => {
    const { keyCode } = event;

    /** Do not scroll when space pressed */
    if (keyCode === 32) event.preventDefault();

    /** If valid code or backspace then unpause and handle keydown */
    if (isValidCode(keyCode) || isBackspace(keyCode)) {
        dispatch(onUnpauseLesson());
        handleKeyboardDown(event, dispatch, getState);
    };
};

export const unpauseLessonOnEsc = (event: KeyboardEvent, dispatch: Dispatch, getState: ThunkGetStateType): void => {
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
    onRemoveEventListener,
    onPauseComparator,
    onUnpauseComparator
};