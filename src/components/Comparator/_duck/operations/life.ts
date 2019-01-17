import { Dispatch } from 'redux';
import { ThunkGetStateType } from '@applicationTypes';

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

const event = 'keydown';
let listeners: [string, EventListenerOrEventListenerObject][] = [];

export const onTurnOnComparator = (): any => ( dispatch: Dispatch ) => {
    dispatch( startStats() );
};

export const onTurnOffComparator = (): any => async ( dispatch: Dispatch ): Promise<Boolean> => {
    listeners.forEach( listener => document.removeEventListener( listener[ 0 ], listener[ 1 ] ) );
    listeners = [];

    let timerStopped = await dispatch( stopStats() );

    if ( timerStopped ) {
        dispatch( onEndLesson() );
        timerStopped = null; // TODO GC
        return true;
    }
};

export const onResetComparator = (): any => ( dispatch: Dispatch, getState: ThunkGetStateType ) => {
    listeners.push( [ event, ( e: KeyboardEvent ) => handleKeyboardDown( e, dispatch, getState ) ] );
    document.addEventListener( event, listeners[ listeners.length - 1 ][ 1 ] );
    dispatch( resetComparator() );
};

const onAddEventListener = ( listener ): any => ( dispatch: Dispatch, getState: ThunkGetStateType ) => {
    if ( listener ) {
        listeners.push( [ event, ( e: KeyboardEvent ) => listener( e, dispatch, getState ) ] );
        document.addEventListener( event, listeners[ listeners.length - 1 ][ 1 ] );
    }
};

const onRemoveEventListener = (): any => () => {
    listeners.forEach( listener => document.removeEventListener( listener[ 0 ], listener[ 1 ] ) );
    listeners = [];
};

export const onListenKeys = (): any => ( dispatch: Dispatch ) => {
    dispatch ( onAddEventListener( handleKeyboardDown ) );
};

export const onStopListenKeys = (): any => ( dispatch: Dispatch ) => {
    dispatch ( onRemoveEventListener() );
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

/** When lesson is paused add eventListener */
export const onPauseComparator = ( eventListener? ): any => ( dispatch: Dispatch ) => {
    dispatch( onRemoveEventListener() );
    /** Add eydown listener: if valid keyCode or backSpace then unpause lesson */
    if ( eventListener ) {
        dispatch( onAddEventListener( eventListener ) );
    }
};

export const onUnpauseComparator = (): any => ( dispatch: Dispatch ) => {
    dispatch( onRemoveEventListener() );
    dispatch( onAddEventListener( handleKeyboardDown ) );
};

export default {
    onTurnOnComparator,
    onTurnOffComparator,
    onResetComparator,
    onPauseComparator,
    onUnpauseComparator
};
