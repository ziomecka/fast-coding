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
} from '@components/Lesson/_duck/actions';

import { onKeepState, onRemoveState } from './restore.state';

import {
    pauseLessonComparator,
    resetLessonComparator,
    turnOffLessonComparator,
    unpauseLessonComparator
} from '@components/LessonComparator/';

import {
    pauseLessonStats,
    resetLessonStats,
    unpauseLessonStats
} from '@components/LessonStats/';

import { ComponentsContainersEnum } from '@componentsTypes';
import { Dispatch } from 'redux';
import { LocalStorageItemEnum } from '@appTypes';
import { ThunkGetStateType } from '@applicationTypes';
import { resetDraggableLessonButtons } from '@components/LessonButtons/';

const { lessonComparator, lesson } = ComponentsContainersEnum;

const {
    lesson: localStorageLesson,
    lessonComparator: localStorageLessonComparator,
    lessonStats: localStorageLessonStats
} = LocalStorageItemEnum;

let timeout;

export const onStartLesson = (): any => async ( dispatch: Dispatch ) => {
    await dispatch( startLesson() );

    /** KEEP STATE */
    return dispatch( onKeepState( localStorageLesson, lesson ) );
};

export const onEndLesson = (): any => ( dispatch: Dispatch ) => {
    clearTimeout( timeout );

    let answer = dispatch( endLesson() );

    if ( answer ) {
        addEscapeReturnListener( dispatch );

        /** KEEP STATE */
        dispatch( onKeepState( localStorageLesson, lesson ) );
        dispatch( onKeepState( localStorageLessonComparator, lessonComparator ) );

        document.getElementById( LESSON_STATS_HTML_ID ).scrollIntoView( true );
    }

    answer = null; // GC
};

const _endLesson = ( dispatch, getState ) => {
    let state = getState().components;

    if ( ( state.lesson.lessonText.length - 1 ) <= state.lessonComparator.currentSignIndex ) {
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
    dispatch( onKeepState( localStorageLesson, lesson ) );
};

export const onEndingLesson = (): any => ( dispatch: Dispatch, getState: ThunkGetStateType ) => {
    if ( !getState().components.lesson.ending ) {
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
    dispatch( resetLessonStats() );
    dispatch( resetLesson() );
    dispatch( resetDraggableLessonButtons() );

    clearTimeout( timeout );

    removeAllKeyDownListeners();

    /** REMOVE STATE */
    dispatch( onRemoveState( localStorageLesson ) );
    dispatch( onRemoveState( localStorageLessonComparator ) );
    dispatch( onRemoveState( localStorageLessonStats ) );
};

export const onRestartLesson = (): any => ( dispatch: Dispatch ): void => {
    /** RESET */
    dispatch( resetLessonComparator() );
    dispatch( resetLessonStats() );

    /** RESTART */
    dispatch( restartLesson() );

    clearTimeout( timeout );

    removeAllKeyDownListeners();

    /** KEEP STATE */
    dispatch( onKeepState( localStorageLesson, lesson ) );
    dispatch( onKeepState( localStorageLessonComparator, lessonComparator ) );
};

export const onPauseLesson = ( listener? ): any => ( dispatch: Dispatch ): void => {
    /** PAUSE */
    dispatch( pauseLessonStats() );
    dispatch( pauseLessonComparator( listener ) );
    dispatch( pauseLesson() );

    /** KEEP STATE */
    dispatch( onKeepState( localStorageLesson, lesson ) );
    dispatch( onKeepState( localStorageLessonComparator, lessonComparator ) );
};

export const onUnpauseLesson = (): any => ( dispatch: Dispatch ): void => {
    /** UNPAUSE */
    dispatch( unpauseLessonComparator() );
    dispatch( unpauseLesson() );
    dispatch( unpauseLessonStats() );

    /** KEEP STATE */
    dispatch( onKeepState( localStorageLesson, lesson ) );
    dispatch( onKeepState( localStorageLessonComparator, lessonComparator ) );
};

export default {
    onEndingLesson,
    onNotEndingLesson,
    onEndLesson,
    onUnpauseLesson,
    onReset
};
