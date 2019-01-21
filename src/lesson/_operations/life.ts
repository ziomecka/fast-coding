import { LESSON_STATS_HTML_ID, WAIT_FOR_LAST_SIGN } from './constants';

import { addEscapeReturnListener, removeAllKeyDownListeners } from './listeners';

import {
    endLesson,
    endingLesson,
    notEndingLesson,
    pauseLesson,
    resetLesson,
    restartLesson,
    startLesson,
    unpauseLesson,
} from '@lesson/_actions/';

import { onKeepState } from './state.keep';
import { onRemoveState } from './state.remove';

import {
    restartLessonComparator,
    turnOffLessonComparator,
} from '@lesson/LessonComparator/';

import {
    pauseLessonStats,
    unpauseLessonStats
} from '@lesson/LessonStats/';

import { Action, Dispatch } from 'redux';
import { KeyboardListener } from '@app/KeyboardListener/';
import { LessonContainersEnum, ThunkGetStateType } from '@applicationTypes';
import { resetDraggableLessonButtons } from '@lesson/LessonButtons/';

/**  */
const { lessonComponent: container } = LessonContainersEnum;
let timeout;
let listenerId: number;

export const onStartLesson = (): any => async ( dispatch: Dispatch ): Promise<Action> => {
    await dispatch( startLesson() );

    /** KEEP STATE */
    return await dispatch( onKeepState() );
};

export const onEndLesson = (): any => async ( dispatch: Dispatch ): Promise<Action> => {
    clearTimeout( timeout );

    let answer = dispatch( endLesson() );

    if ( answer ) {
        answer = null; // GC
        addEscapeReturnListener( dispatch );

        document.getElementById( LESSON_STATS_HTML_ID ).scrollIntoView( true );

        /** KEEP STATE */
        return await dispatch( onKeepState() );
    }
};

const _endLesson = ( dispatch: Dispatch, getState: ThunkGetStateType ): void => {
    let state = getState().lesson;

    if ( ( state.lessonComponent.lessonText.length - 1 ) <= state.lessonComparator.currentSignIndex ) {
        /** LessonComparator ends lesson after switching off keyboardListener and lessonStats */
        dispatch( turnOffLessonComparator() );
    }

    clearTimeout( timeout );

    state = null; // GC
};

export const onNotEndingLesson = (): any => async ( dispatch: Dispatch ): Promise<Action> => {
    clearTimeout( timeout );

    let answer = await dispatch( notEndingLesson() );

    if ( answer ) {
        answer = null; // GC
        /** KEEP STATE */
        return await dispatch( onKeepState() );
    }
};

export const onEndingLesson = (): any => async ( dispatch: Dispatch, getState: ThunkGetStateType ): Promise<Action> => {
    if ( !getState().lesson.ending ) {
        timeout = setTimeout(
            () => _endLesson( dispatch, getState ),
            WAIT_FOR_LAST_SIGN
        );
        return await dispatch( endingLesson() );
    }
};

export const onReset = (): any => async ( dispatch: Dispatch ): Promise<boolean> => {
    /** RESET */

    let answer;

    answer = await dispatch( resetLesson() );

    if ( answer ) {
        answer = null;
        answer = await dispatch( resetDraggableLessonButtons() );
    }

    clearTimeout( timeout );

    if ( answer ) {
        answer = null;
        answer = removeAllKeyDownListeners();
    }

    if ( answer ) {
        answer = null; // GC

        /** REMOVE STATE */
        return onRemoveState();
    }
};

export const onRestartLesson = (): any => async ( dispatch: Dispatch ): Promise<Action> => {
    /** RESET */
    let answer = await dispatch( onReset() );

    /** RESTART */
    if ( answer ) answer = await dispatch( restartLessonComparator() );
    if ( answer ) answer = await dispatch( restartLesson() );

    if ( answer ) answer = removeAllKeyDownListeners();

    if ( answer ) {
        answer = null; // GC

        /** KEEP STATE */
        return await dispatch( onKeepState() );
    }
};

export const onPauseLesson = ( listener? ): any => async ( dispatch: Dispatch, getState: ThunkGetStateType ): Promise<Action> => {
    /** PAUSE */
    let answer = await dispatch( pauseLessonStats() );

    if ( listener ) {
        listenerId = KeyboardListener.addListener( { container, listener: [ 'keydown', ( e ) => listener( e, dispatch, getState ) ] } );
    }

    if ( answer ) {
        answer = null;
        answer = await dispatch( pauseLesson() );
    }

    if ( answer ) {
        answer = null; // GC

        /** KEEP STATE */
        return await dispatch( onKeepState() );
    }
};

export const onUnpauseLesson = (): any => async ( dispatch: Dispatch ): Promise<Action> => {
    KeyboardListener.removeListener( { container, listenerId } );

    /** UNPAUSE */
    let answer = await dispatch( unpauseLesson() );
    if ( answer ) answer = await dispatch( unpauseLessonStats() );

    if ( answer ) {
        answer = null; // GC

        /** KEEP STATE */
        return await dispatch( onKeepState() );
    }
};

export default {
    onEndingLesson,
    onNotEndingLesson,
    onEndLesson,
    onUnpauseLesson,
    onReset
};
