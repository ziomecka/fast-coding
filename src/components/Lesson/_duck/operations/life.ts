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
    return dispatch( onKeepState( localStorageLesson, lesson ) );
};

export const onEndLesson = (): any => ( dispatch: Dispatch ) => {
    clearTimeout( timeout );
    let answer = dispatch( endLesson() );
    if ( answer ) {
        addEscapeReturnListener( dispatch );
        document.getElementById( LESSON_STATS_HTML_ID ).scrollIntoView( true );
        dispatch( onKeepState( localStorageLesson, lesson ) );
        dispatch( onKeepState( localStorageLessonComparator, lessonComparator ) );
    }
};

const _endLesson = ( dispatch, getState ) => {
    let state = getState().components;

    if ( ( state.lesson.lessonText.length - 1 ) <= state.lessonComparator.currentSignIndex ) {
        /** LessonComparator ends lesson after switching off keyboardListener and lessonStats */
        dispatch( turnOffLessonComparator() );
    }
    clearTimeout( timeout );
};

export const onNotEndingLesson = (): any => ( dispatch: Dispatch, getState: ThunkGetStateType ) => {
    clearTimeout( timeout );
    dispatch( notEndingLesson() );
    dispatch( onKeepState( localStorageLesson, lesson ) );
};

export const onEndingLesson = (): any => ( dispatch: Dispatch, getState: ThunkGetStateType ) => {
    const { ending } = getState().components.lesson;

    if ( !ending ) {
        dispatch( endingLesson() );

        timeout = setTimeout(
            () => _endLesson( dispatch, getState ),
            WAIT_FOR_LAST_SIGN
        );
    }
};

export const onReset = (): any => ( dispatch: Dispatch ) => {
    dispatch( resetLessonComparator() );
    dispatch( resetLessonStats() );
    dispatch( resetLesson() );
    dispatch( resetDraggableLessonButtons() );
    clearTimeout( timeout );
    removeAllKeyDownListeners();

    dispatch( onRemoveState( localStorageLesson ) );
    dispatch( onRemoveState( localStorageLessonComparator ) );
    dispatch( onRemoveState( localStorageLessonStats ) );
};

export const onRestartLesson = (): any => ( dispatch: Dispatch ): void => {
    dispatch( resetLessonComparator() );
    dispatch( resetLessonStats() );
    dispatch( restartLesson() );
    clearTimeout( timeout );
    removeAllKeyDownListeners();
    dispatch( onKeepState( localStorageLesson, lesson ) );
    dispatch( onKeepState( localStorageLessonComparator, lessonComparator ) );
};

export const onPauseLesson = ( listener? ): any => ( dispatch: Dispatch ): void => {
    dispatch( pauseLessonStats() );
    dispatch( pauseLessonComparator( listener ) );
    dispatch( pauseLesson() );
    dispatch( onKeepState( localStorageLesson, lesson ) );
    dispatch( onKeepState( localStorageLessonComparator, lessonComparator ) );
};

export const onUnpauseLesson = (): any => ( dispatch: Dispatch ): void => {
    dispatch( unpauseLessonComparator() );
    dispatch( unpauseLesson() );
    dispatch( unpauseLessonStats() );
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
