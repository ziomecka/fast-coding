import { Action, Dispatch } from 'redux';
import { ThunkGetStateType, LessonContainersEnum } from '@applicationTypes';

const { lessonComparator: container } = LessonContainersEnum;

import {
    startLessonStats,
    stopLessonStats
} from '@lesson/LessonStats/';

import { onEndLesson, onUnpauseLesson } from '@lesson/_operations/';

import {
    handleEscape,
    handleKeyboardDown
} from './handle.keys';

import {
    isBackspace,
    isEscape,
    isSpace,
    isValidCode,
} from './helpers';

import { KeyboardListener } from '@app/KeyboardListener/';

import { listenedEvent } from './constants';

let runningKeyboardDownListenerId: number;
let pausedKeyboardDownListenerId: number;

/** Start stats */
export const onTurnOnLessonComparator = (): any => ( dispatch: Dispatch ): Promise<Action> => (
    dispatch( startLessonStats() )
);

/** Remove listeners, stop stats, end lesson */
export const onTurnOffLessonComparator = (): any => async ( dispatch: Dispatch ): Promise<Action> => {
    let answer = KeyboardListener.removeListener( { container, listenerId: runningKeyboardDownListenerId } );

    if ( answer ) {
        answer = null;
        let timerStopped = await dispatch( stopLessonStats() );

        if ( timerStopped ) {
            timerStopped = null; // GC
            return dispatch( onEndLesson() );
        }
    }
};

/** Add listeners */
export const onRestartLessonComparator = (): any => ( dispatch: Dispatch ): Promise<void> => (
    dispatch( onListenKeys() )
);

export const onListenKeys = (): any => ( dispatch: Dispatch, getState: ThunkGetStateType ): number => {
    runningKeyboardDownListenerId = KeyboardListener.addListener( {
        container,
        listener: [ listenedEvent, ( e: KeyboardEvent ) => {
            e.stopPropagation();
            return handleKeyboardDown( e, dispatch, getState );
        } ]
    } );
    return runningKeyboardDownListenerId;
};

export const onStopListenKeys = (): any => (): boolean => (
    KeyboardListener.removeListener( { container, listenerId: runningKeyboardDownListenerId } )
);

/**
 * Listen to escape - start leaving lesson.
 * Listen to validCode or backspace - unpause lesson
 * */
export const pausedLessonListener = ( event: KeyboardEvent, dispatch: Dispatch, getState: ThunkGetStateType ): void => {
    const { keyCode } = event;

    /** Do not scroll when space pressed */
    if ( isSpace( keyCode ) ) {
        event.preventDefault();
    }

    /** If valid code or backspace then unpause and handle keydown */
    if ( isValidCode( keyCode ) || isBackspace( keyCode ) ) {
        dispatch( onUnpauseLesson() );
        handleKeyboardDown( event, dispatch, getState );
    }

    /** If escape then start leaving lesson */
    if ( isEscape( keyCode ) ) {
        handleEscape( dispatch, getState );
    }
};

/**
 * When lesson is paused:
 *  remove current eventListener
 *  add keydown listener: if valid keyCode or backSpace then unpause lesson
 *
 * */
export const onPauseLessonComparator = ( eventListener? ): any => (): number => {
    KeyboardListener.removeListener( { container, listenerId: runningKeyboardDownListenerId } );

    if ( eventListener ) {
        pausedKeyboardDownListenerId = KeyboardListener.addListener( { container, listener: eventListener } );
        return pausedKeyboardDownListenerId;
    }
};

export const onUnpauseLessonComparator = (): any => ( dispatch: Dispatch, getState: ThunkGetStateType ): number => {
    KeyboardListener.removeListener( { container, listenerId: pausedKeyboardDownListenerId } );

    runningKeyboardDownListenerId = KeyboardListener.addListener( {
        container,
        listener: [ listenedEvent, ( e: KeyboardEvent ) => {
            e.stopPropagation();
            return handleKeyboardDown( e, dispatch, getState );
        } ]
    } );

    return runningKeyboardDownListenerId;
};

export default {
    onTurnOnLessonComparator,
    onTurnOffLessonComparator,
    onRestartLessonComparator,
    onPauseLessonComparator,
    onUnpauseLessonComparator
};
