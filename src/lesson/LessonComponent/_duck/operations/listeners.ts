import * as manageKeydownListeners from '@app/KeyboardListener/_duck/operations';
import { isEnter, isEscape } from '@lesson/LessonComparator/';
import { AppRoutesEnum } from '@appTypes';
import { LessonContainersEnum } from '@lessonTypes';
import { Dispatch } from 'redux';
import history from '@shared/history';
import { onRestartLesson } from './life';

const { lessons } = AppRoutesEnum;
const { lesson: container } = LessonContainersEnum;

let listenerId;

const escapeReturnListener = ( e: KeyboardEvent, dispatch: Dispatch ) => {
    if ( isEscape( e.keyCode ) ) {
        // TODO reset everything
        history.push( lessons );
    }

    if ( isEnter( e.keyCode ) ) {
        dispatch( onRestartLesson() );
    }
};

export const addEscapeReturnListener = ( dispatch: Dispatch ): number => {
    listenerId = manageKeydownListeners.onAddListener( {
        container,
        listener: [ 'keydown', ( e: KeyboardEvent ) => escapeReturnListener( e, dispatch ) ]
    } );
    return listenerId;
};

export const removeAllKeyDownListeners = (): boolean => {
    return manageKeydownListeners.onRemoveListener( { container, listenerId } );
};
