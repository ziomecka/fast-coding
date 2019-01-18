import { Dispatch } from 'redux';
import { ThunkGetStateType } from '@applicationTypes';
import { ComponentsContainersEnum } from '@componentsTypes';
import { LocalStorageItemEnum } from '@appTypes';
import { addEscapeReturnListener, removeAllKeyDownListeners } from './listeners';
const { lessonComparator, lesson } = ComponentsContainersEnum;

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

import { resetDraggableLessonButtons } from '@components/LessonButtons/';

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
        document.getElementById( 'lessonLessonStats' ).scrollIntoView( true );
        dispatch( onKeepState( LocalStorageItemEnum.lesson, lesson ) );
        dispatch( onKeepState( LocalStorageItemEnum.lessonComparator, lessonComparator ) );
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
    dispatch( resetLessonComparator() );
    dispatch( resetLessonStats() );
    dispatch( resetLesson() );
    dispatch( resetDraggableLessonButtons() );
    clearTimeout( timeout );
    removeAllKeyDownListeners();

    dispatch( onRemoveState( LocalStorageItemEnum.lesson ) );
    dispatch( onRemoveState( LocalStorageItemEnum.lessonComparator ) );
    dispatch( onRemoveState( LocalStorageItemEnum.lessonStats ) );
};

export const onRestartLesson = (): any => ( dispatch: Dispatch ): void => {
    dispatch( resetLessonComparator() );
    dispatch( resetLessonStats() );
    dispatch( restartLesson() );
    clearTimeout( timeout );
    removeAllKeyDownListeners();
    dispatch( onKeepState( LocalStorageItemEnum.lesson, lesson ) );
    dispatch( onKeepState( LocalStorageItemEnum.lessonComparator, lessonComparator ) );
};

export const onPauseLesson = ( listener? ): any => ( dispatch: Dispatch ): void => {
    dispatch( pauseLessonStats() );
    dispatch( pauseLessonComparator( listener ) );
    dispatch( pauseLesson() );
    dispatch( onKeepState( LocalStorageItemEnum.lesson, lesson ) );
    dispatch( onKeepState( LocalStorageItemEnum.lessonComparator, lessonComparator ) );
};

export const onUnpauseLesson = (): any => ( dispatch: Dispatch ): void => {
    dispatch( unpauseLessonComparator() );
    dispatch( unpauseLesson() );
    dispatch( unpauseLessonStats() );
    dispatch( onKeepState( LocalStorageItemEnum.lesson, lesson ) );
    dispatch( onKeepState( LocalStorageItemEnum.lessonComparator, lessonComparator ) );
};

export default {
    onEndingLesson,
    onNotEndingLesson,
    onEndLesson,
    onUnpauseLesson,
    onReset
};
