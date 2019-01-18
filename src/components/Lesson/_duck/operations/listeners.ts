import { AppRoutesEnum } from '@appTypes';
import { ComponentsContainersEnum } from '@componentsTypes';
import { Dispatch } from 'redux';

import history from '@shared/history';
import * as manageKeydownListeners from '@app/KeyboardListener/_duck/operations';
import { onRestartLesson } from './life';
import { isEnter, isEscape } from '@components/LessonComparator/';
const { lessons } = AppRoutesEnum;
const { lesson: container } = ComponentsContainersEnum;

const escapeReturnListener = ( e: KeyboardEvent, dispatch: Dispatch ) => {
    if ( isEscape( e.keyCode ) ) {
        // TODO reset everything
        history.push( lessons );
    }

    if ( isEnter( e.keyCode ) ) {
        dispatch( onRestartLesson() );
    }
};

let listenerId;

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
