import { AppRoutesEnum } from '@appTypes';
import { ComponentsContainersEnum } from '@componentsTypes';
import { Dispatch } from 'redux';

import history from '@shared/history';
import * as manageKeydownListeners from '@app/KeyboardListener/_duck/operations';
import { onRestartLesson } from './life';

const { lessons } = AppRoutesEnum;
const { lesson: container } = ComponentsContainersEnum;

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
