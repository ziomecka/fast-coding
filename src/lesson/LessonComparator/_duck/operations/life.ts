import { Dispatch } from 'redux';
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

import {
    addListener,
    removeAllListeners,
    removeListener
} from '@app/KeyboardListener/';

import { listenedEvent } from './constants';

let keyboardDownListenerId: number;

export const onTurnOnLessonComparator = (): any => ( dispatch: Dispatch ) => {
    dispatch( startLessonStats() );
};

export const onTurnOffLessonComparator = (): any => async ( dispatch: Dispatch ): Promise<Boolean> => {
    removeAllListeners( { container } );

    let timerStopped = await dispatch( stopLessonStats() );

    if ( timerStopped ) {
        dispatch( onEndLesson() );
        timerStopped = null; // TODO GC
        return true;
    }
};

export const onResetLessonComparator = (): any => ( dispatch: Dispatch ) => (
    dispatch( onListenKeys() )
);

export const onListenKeys = (): any => ( dispatch: Dispatch, getState: ThunkGetStateType ) => {
    keyboardDownListenerId = addListener( { container, listener: [ listenedEvent, ( e: KeyboardEvent ) => handleKeyboardDown( e, dispatch, getState ) ] } );
};

export const onStopListenKeys = (): any => () => {
    removeListener( { container, listenerId: keyboardDownListenerId } );
};

/** Listen to escape - start leaving lesson. Listen to validCode or backspace - unpause lesson */
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

    if ( isEscape( keyCode ) ) {
        handleEscape( dispatch, getState );
    }
};

/** When lesson is paused */
export const onPauseLessonComparator = ( eventListener? ): any => () => {
    /** Remove current eventListener */
    removeListener( { container, listenerId: keyboardDownListenerId } );
    if ( eventListener ) {
        /** Add keydown listener: if valid keyCode or backSpace then unpause lesson */
        keyboardDownListenerId = addListener( { container, listener: eventListener } );
    }
};

export const onUnpauseLessonComparator = (): any => ( dispatch: Dispatch, getState: ThunkGetStateType ) => {
    removeListener( { container, listenerId: keyboardDownListenerId } );
    keyboardDownListenerId = addListener( { container, listener: [ listenedEvent, ( e: KeyboardEvent ) => handleKeyboardDown( e, dispatch, getState ) ] } );
};

export default {
    onTurnOnLessonComparator,
    onTurnOffLessonComparator,
    onResetLessonComparator,
    onPauseLessonComparator,
    onUnpauseLessonComparator
};
