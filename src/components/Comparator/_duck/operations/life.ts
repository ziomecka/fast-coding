import { Dispatch } from 'redux';
import { ThunkGetStateType, ComponentsContainersEnum } from '@applicationTypes';

const { comparator: container } = ComponentsContainersEnum;

import { resetComparator } from '../actions';

import {
    startStats,
    stopStats
} from '@components/Stats/';

import { onEndLesson, onUnpauseLesson } from '@components/Lesson/';

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

export const onTurnOnComparator = (): any => ( dispatch: Dispatch ) => {
    dispatch( startStats() );
};

export const onTurnOffComparator = (): any => async ( dispatch: Dispatch ): Promise<Boolean> => {
    removeAllListeners( { container } );

    let timerStopped = await dispatch( stopStats() );

    if ( timerStopped ) {
        dispatch( onEndLesson() );
        timerStopped = null; // TODO GC
        return true;
    }
};

export const onResetComparator = (): any => ( dispatch: Dispatch, getState: ThunkGetStateType ) => {
    dispatch( onListenKeys() );
    dispatch( resetComparator() );
};


export const onListenKeys = (): any => ( dispatch: Dispatch, getState: ThunkGetStateType ) => {
    keyboardDownListenerId = dispatch ( addListener( { container, listener: [ listenedEvent, ( e: KeyboardEvent ) => handleKeyboardDown( e, dispatch, getState ) ] } ) );
};

export const onStopListenKeys = (): any => ( dispatch: Dispatch ) => {
    dispatch ( removeListener( { container, listenerId: keyboardDownListenerId } ) );
};

/** Listen to escape - start leaving lesson. Listen to validCode or backspace - unpause lesson */
export const pausedLessonListener = ( event: KeyboardEvent, dispatch: Dispatch, getState: ThunkGetStateType ): void => {
    const { keyCode } = event;

    /** Do not scroll when space pressed */
    if ( isSpace( keyCode ) ) event.preventDefault();

    /** If valid code or backspace then unpause and handle keydown */
    if ( isValidCode( keyCode ) || isBackspace( keyCode ) ) {
        dispatch( onUnpauseLesson() );
        handleKeyboardDown( event, dispatch, getState );
    }

    if ( isEscape( keyCode ) ) handleEscape( dispatch, getState );
};

/** When lesson is paused */
export const onPauseComparator = ( eventListener? ): any => ( dispatch: Dispatch ) => {
    /** Remove current eventListener */
    removeListener( { container, listenerId: keyboardDownListenerId } );
    if ( eventListener ) {
        /** Add keydown listener: if valid keyCode or backSpace then unpause lesson */
        keyboardDownListenerId = dispatch( addListener( { container, listener: eventListener } ) );
    }
};

export const onUnpauseComparator = (): any => ( dispatch: Dispatch, getState: ThunkGetStateType ) => {
    dispatch( removeListener( { container, listenerId: keyboardDownListenerId } ) );
    keyboardDownListenerId = dispatch( addListener( { container, listener: [ listenedEvent, ( e: KeyboardEvent ) => handleKeyboardDown( e, dispatch, getState ) ] } ) );
};

export default {
    onTurnOnComparator,
    onTurnOffComparator,
    onResetComparator,
    onPauseComparator,
    onUnpauseComparator
};
