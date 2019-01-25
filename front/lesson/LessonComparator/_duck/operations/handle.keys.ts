import { Action, Dispatch } from 'redux';

import { ThunkGetStateType } from '@applicationTypes';
import { AppRoutesEnum } from '@appTypes';

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
} from '@lesson/_operations/';

import history from '@shared/history';
import { onStartLeaving } from '@lesson/LessonButtons/';

import {
    isBackspace,
    isEscape,
    isSpace,
    isValidCode
} from './helpers';

export const handleKeyboardDown = ( event: KeyboardEvent, dispatch: Dispatch, getState: ThunkGetStateType ): void => {
    const { key, keyCode } = event;

    /** Do not scroll when space pressed */
    if ( isSpace( keyCode ) ) event.preventDefault();
    if ( isValidCode( keyCode ) ) handleKeyDown( key, dispatch, getState );
    if ( isBackspace( keyCode ) ) handleBackSpace( dispatch, getState );
    if ( isEscape( keyCode ) ) handleEscape( dispatch, getState );
};

const handleBackSpace = async ( dispatch: Dispatch, getState: ThunkGetStateType ): Promise<boolean> => {
    let state = getState().lesson;

    let { errors, correctedErrors, currentSignIndex } = state.lessonComparator;
    let { ending } = state;

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

    /** Keep state in local storage */
    if ( answer ) {
        answer = null; // GC
        state = null; // GC
        errors = null; // GC
        correctedErrors = null;

        return await dispatch( onKeepState() );
    }
};

const handleKeyDown = async ( key: string, dispatch: Dispatch, getState: ThunkGetStateType ): Promise<Action> => {
    let state = getState().lesson;
    let { errors, allErrors, currentSignIndex } = state.lessonComparator;
    let { lessonText: text } = state.lessonComponent;

    /** currentSignIndex cannot be higher then text.length - 1 */
    const nextCurrentSignIndex = ( currentSignIndex + 1 > text.length - 1 )
        ? currentSignIndex
        : currentSignIndex + 1;

    const expectedSign = state.lessonComponent.lessonText[ nextCurrentSignIndex ];

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
        answer = null; // GC
        state = null; // TODO GC?
        allErrors = null;

        return await dispatch( onKeepState() );
    }
};

export const handleEscape = ( dispatch: Dispatch, getState: ThunkGetStateType ): void => {
    if ( getState().lesson.lessonComparator.currentSignIndex >= 0 ) {
        dispatch( onStartLeaving() );
    } else {
        history.push( lessons );
    }
};

export default {
    handleEscape,
    handleKeyboardDown
};
