import { Dispatch } from 'redux';
import { ThunkGetStateType } from '@applicationTypes';
import { ComponentsContainersEnum } from '@componentsTypes';
import { AppRoutesEnum, LocalStorageItemEnum } from '@appTypes';

const { comparator, lesson } = ComponentsContainersEnum;
const { lessons } = AppRoutesEnum;

import history from '@shared/history';

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

import {
    pauseComparator,
    resetComparator,
    turnOffComparator,
    unpauseComparator
} from '@components/Comparator/';

import {
    pauseStats,
    resetStats,
    unpauseStats
} from '@components/Stats/';

import { resetDraggableLessonButtons } from '@components/LessonButtons/';

/** Keyboard listener imports */
import * as manageKeydownListeners from '@app/KeyboardListener/_duck/operations';
const { lesson: container } = ComponentsContainersEnum;

/** Time to correct the last sign */
const waitForLastSign = 800;
let timeout;

export const onStartLesson = (): any => async ( dispatch: Dispatch ) => {
    await dispatch( startLesson() );
    return dispatch( onKeepState( LocalStorageItemEnum.lesson, lesson ) );
};

export const onEndLesson = (): any => ( dispatch: Dispatch ) => {
    clearTimeout( timeout );
    let answer = dispatch( endLesson() );
    if ( answer ) {
        addEscapeReturnListener( dispatch );
        document.getElementById( 'lessonStats' ).scrollIntoView( true );
        dispatch( onKeepState( LocalStorageItemEnum.lesson, lesson ) );
        dispatch( onKeepState( LocalStorageItemEnum.comparator, comparator ) );
    }
};

// let manageKeyDownListeners = keydownListeners();

const escapeReturnListener = ( e: KeyboardEvent, dispatch: Dispatch ) => {
    if ( e.keyCode === 27 ) {
        // TODO reset everything
        history.push( lessons );
    }

    if ( e.keyCode === 13 ) {
        dispatch( onRestartLesson() );
    }
};

let listenerId;

const addEscapeReturnListener = ( dispatch: Dispatch ): number => {
    listenerId = manageKeydownListeners.onAddListener( {
        container,
        listener: [ 'keydown', ( e: KeyboardEvent ) => escapeReturnListener( e, dispatch ) ]
    } );
    return listenerId;
};

const removeAllKeyDownListeners = (): boolean => {
    return manageKeydownListeners.onRemoveListener( { container, listenerId } );
};

const _endLesson = ( dispatch, getState ) => {
    let state = getState().components;

    if ( ( state.lesson.lessonText.length - 1 ) <= state.comparator.currentSignIndex ) {
        /** Comparator ends lesson after switching off keyboardListener and stats */
        dispatch( turnOffComparator() );
    }
    clearTimeout( timeout );
};

export const onNotEndingLesson = (): any => ( dispatch: Dispatch, getState: ThunkGetStateType ) => {
    clearTimeout( timeout );
    dispatch( notEndingLesson() );
    dispatch( onKeepState( LocalStorageItemEnum.lesson, lesson ) );
};

export const onEndingLesson = (): any => ( dispatch: Dispatch, getState: ThunkGetStateType ) => {
    const { ending } = getState().components.lesson;

    if ( !ending ) {
        dispatch( endingLesson() );

        timeout = setTimeout(
            () => _endLesson( dispatch, getState ),
            waitForLastSign
        );
    }
};

export const onReset = (): any => ( dispatch: Dispatch ) => {
    dispatch( resetComparator() );
    dispatch( resetStats() );
    dispatch( resetLesson() );
    dispatch( resetDraggableLessonButtons() );
    clearTimeout( timeout );
    removeAllKeyDownListeners();

    dispatch( onRemoveState( LocalStorageItemEnum.lesson ) );
    dispatch( onRemoveState( LocalStorageItemEnum.comparator ) );
    dispatch( onRemoveState( LocalStorageItemEnum.stats ) );
};

export const onRestartLesson = (): any => ( dispatch: Dispatch ): void => {
    dispatch( resetComparator() );
    dispatch( resetStats() );
    dispatch( restartLesson() );
    clearTimeout( timeout );
    removeAllKeyDownListeners();
    dispatch( onKeepState( LocalStorageItemEnum.lesson, lesson ) );
    dispatch( onKeepState( LocalStorageItemEnum.comparator, comparator ) );
};

export const onPauseLesson = ( listener? ): any => ( dispatch: Dispatch ): void => {
    dispatch( pauseStats() );
    dispatch( pauseComparator( listener ) );
    dispatch( pauseLesson() );
    dispatch( onKeepState( LocalStorageItemEnum.lesson, lesson ) );
    dispatch( onKeepState( LocalStorageItemEnum.comparator, comparator ) );
};

export const onUnpauseLesson = (): any => ( dispatch: Dispatch ): void => {
    dispatch( unpauseComparator() );
    dispatch( unpauseLesson() );
    dispatch( unpauseStats() );
    dispatch( onKeepState( LocalStorageItemEnum.lesson, lesson ) );
    dispatch( onKeepState( LocalStorageItemEnum.comparator, comparator ) );
};

export default {
    onEndingLesson,
    onNotEndingLesson,
    onEndLesson,
    onUnpauseLesson,
    onReset
};
