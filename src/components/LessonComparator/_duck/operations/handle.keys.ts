import { Dispatch } from 'redux';

import { ThunkGetStateType } from '@applicationTypes';
import { ComponentsContainersEnum } from '@componentsTypes';
import { LocalStorageItemEnum, AppRoutesEnum } from '@appTypes';

const { lessonComparator } = ComponentsContainersEnum;
const { lessons } = AppRoutesEnum;

import {
    registerNewKey,
    registerError,
    registerBackspace,
    correctError,
} from '../actions';

import {
    onKeepState,
    onNotEndingLesson
} from '@components/Lesson/';

import history from '@shared/history';
import { onStartLeaving } from '@components/LessonButtons/';

import {
    isBackspace,
    isEscape,
    isValidCode
} from './helpers';

export const handleKeyboardDown
= ( event: KeyboardEvent, dispatch: Dispatch, getState: ThunkGetStateType ): void => {

    const { key, keyCode } = event;

    /** Do not scroll when space pressed */
    if ( keyCode === 32 ) event.preventDefault();
    if ( isValidCode( keyCode ) ) handleKeyDown( key, dispatch, getState );
    if ( isBackspace( keyCode ) ) handleBackSpace( dispatch, getState );
    if ( isEscape( keyCode ) ) handleEscape( dispatch, getState );
};

const handleBackSpace = async ( dispatch: Dispatch, getState: ThunkGetStateType ): Promise<boolean> => {
    let state = getState().components;

    let { errors, correctedErrors, currentSignIndex } = state.lessonComparator;
    let { ending } = state.lesson;

    const wasAnError = errors[ errors.length - 1 ] === currentSignIndex;

    /** To keep dispatch answer */
    let answer: any;

    if ( wasAnError ) {
        /** Add to corrected errors only if not already included */
        if ( !correctedErrors.includes( currentSignIndex ) ) {
            correctedErrors.push( currentSignIndex );
        }

        answer = await dispatch( correctError( correctedErrors ) );

    } else {
        answer = await dispatch( registerBackspace() );

        if ( answer && ending ) {
            answer = await dispatch( onNotEndingLesson() );
        }
    }

    /** Keep state in local storage. In case page is refreshed (like F5) */
    /** currentSignIndex will be stored */
    if ( answer ) {
        await dispatch( onKeepState( LocalStorageItemEnum.lessonComparator, lessonComparator ) );
        answer = null; // GC
    }

    /** Keep state in local storage. In case page is refreshed (like F5) */
    /** currentSignIndex will be stored */
    if ( answer ) {
        await dispatch( onKeepState( LocalStorageItemEnum.lessonComparator, lessonComparator ) );
        answer = null; // GC
    }

    state = null; // TODO GC?ype
    errors = null; // TODO GC?
    correctedErrors = null;

    return true;
};

const handleKeyDown = async ( key: string, dispatch: Dispatch, getState: ThunkGetStateType ): Promise<boolean> => {
    let state = getState().components;
    let { errors, allErrors, currentSignIndex } = state.lessonComparator;
    let { lessonText: text } = state.lesson;

    /** currentSignIndex cannot be higher then text.length - 1 */
    const nextCurrentSignIndex = ( currentSignIndex + 1 > text.length - 1 )
        ? currentSignIndex
        : currentSignIndex + 1;

    const expectedSign = state.lesson.lessonText[ nextCurrentSignIndex ];

    /** To keep dispatch answer */
    let answer: any;

    if ( key !== expectedSign ) {
        /** Add to all errors only if not already included */
        if ( !allErrors.includes( nextCurrentSignIndex ) ) {
            allErrors.push( nextCurrentSignIndex );
        }

        /** Prevents adding the last letter several times when lesson is ending */
        if ( currentSignIndex !== nextCurrentSignIndex ) {
            errors.push( nextCurrentSignIndex );
        }

        answer = await dispatch( registerError( errors, allErrors, nextCurrentSignIndex ) );
    } else {
        answer = await dispatch( registerNewKey( nextCurrentSignIndex ) );
    }

    /** Keep state in local storage. In case page is refreshed (like F5) */
    /** errors, allErrors and /or currentSignIndex will be kept */
    if ( answer ) {
        await dispatch( onKeepState( LocalStorageItemEnum.lessonComparator, lessonComparator ) );
        answer = null; // GC
    }

    state = null; // TODO GC?
    allErrors = null;

    return true;
};

export const handleEscape = async ( dispatch: Dispatch, getState: ThunkGetStateType ): Promise<boolean> => {
    if ( getState().components.lessonComparator.currentSignIndex >= 0 ) {
        await dispatch( onStartLeaving() );
    } else {
        await history.push( lessons );
    }

    return true;
};

export default {
    handleEscape,
    handleKeyboardDown
};
