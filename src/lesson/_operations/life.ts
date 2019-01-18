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
    pauseLessonComparator,
    resetLessonComparator,
    turnOffLessonComparator,
    unpauseLessonComparator
} from '@lesson/LessonComparator/';

import {
    pauseLessonStats,
    unpauseLessonStats
} from '@lesson/LessonStats/';

import { Dispatch } from 'redux';
import { ThunkGetStateType } from '@applicationTypes';
import { resetDraggableLessonButtons } from '@lesson/LessonButtons/';

let timeout;

export const onStartLesson = (): any => async ( dispatch: Dispatch ) => {
    await dispatch( startLesson() );

    /** KEEP STATE */
    return dispatch( onKeepState() );
};

export const onEndLesson = (): any => ( dispatch: Dispatch ) => {
    clearTimeout( timeout );

    let answer = dispatch( endLesson() );

    if ( answer ) {
        addEscapeReturnListener( dispatch );

        /** KEEP STATE */
        dispatch( onKeepState() );

        document.getElementById( LESSON_STATS_HTML_ID ).scrollIntoView( true );
    }

    answer = null; // GC
};

const _endLesson = ( dispatch: Dispatch, getState: ThunkGetStateType ) => {
    let state = getState().lesson;

    if ( ( state.lessonComponent.lessonText.length - 1 ) <= state.lessonComparator.currentSignIndex ) {
        /** LessonComparator ends lesson after switching off keyboardListener and lessonStats */
        dispatch( turnOffLessonComparator() );
    }

    clearTimeout( timeout );

    state = null; // GC
};

export const onNotEndingLesson = (): any => ( dispatch: Dispatch, getState: ThunkGetStateType ) => {
    clearTimeout( timeout );

    dispatch( notEndingLesson() );

    /** KEEP STATE */
    dispatch( onKeepState() );
};

export const onEndingLesson = (): any => ( dispatch: Dispatch, getState: ThunkGetStateType ) => {
    if ( !getState().lesson.ending ) {
        dispatch( endingLesson() );

        timeout = setTimeout(
            () => _endLesson( dispatch, getState ),
            WAIT_FOR_LAST_SIGN
        );
    }
};

export const onReset = (): any => ( dispatch: Dispatch ) => {
    /** RESET */
    dispatch( resetLessonComparator() );
    dispatch( resetLesson() );
    dispatch( resetDraggableLessonButtons() );

    clearTimeout( timeout );

    removeAllKeyDownListeners();

    /** REMOVE STATE */
    onRemoveState();
};

export const onRestartLesson = (): any => ( dispatch: Dispatch ): void => {
    /** RESET */
    dispatch( resetLessonComparator() );
    dispatch( onReset() );

    /** RESTART */
    dispatch( restartLesson() );

    clearTimeout( timeout );

    removeAllKeyDownListeners();

    /** KEEP STATE */
    dispatch( onKeepState() );
};

export const onPauseLesson = ( listener? ): any => ( dispatch: Dispatch ): void => {
    /** PAUSE */
    dispatch( pauseLessonStats() );
    dispatch( pauseLessonComparator( listener ) );
    dispatch( pauseLesson() );

    /** KEEP STATE */
    dispatch( onKeepState() );
};

export const onUnpauseLesson = (): any => ( dispatch: Dispatch ): void => {
    /** UNPAUSE */
    dispatch( unpauseLessonComparator() );
    dispatch( unpauseLesson() );
    dispatch( unpauseLessonStats() );

    /** KEEP STATE */
    dispatch( onKeepState() );
};

export default {
    onEndingLesson,
    onNotEndingLesson,
    onEndLesson,
    onUnpauseLesson,
    onReset
};
