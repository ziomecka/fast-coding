import { Dispatch } from 'redux';

import { ThunkGetStateType } from '@applicationTypes';
import { LocalStorageItemEnum, AppContainersEnum } from '@appTypes';

import { openDemoLesson } from '@lesson/LessonComponent/_duck/actions';

import { getActiveLanguage } from 'react-localize-redux';

import { localStorageRemoveItem } from '@app/LocalStorage/_duck/operations';

/** Keyboard listener imports */
import { manageButtonFocus as buttonFocus } from '@shared/button.focus';
import { KeyboardListener } from '@app/KeyboardListener/';

const { lesson } = LocalStorageItemEnum;

const clearLocalStorage = () => localStorageRemoveItem( lesson );

export const onOpenDemoLesson = (): any => ( dispatch: Dispatch, getState: ThunkGetStateType ) => {
    const language = getActiveLanguage( getState().localize ).code;

    clearLocalStorage();

    return dispatch( openDemoLesson( language ) );
};

/** Keyboard listener */
const { welcome: container } = AppContainersEnum;
export const buttonsIds = [ 'homeSeeLessons', 'homeStartTyping' ];

const manageButtonFocus = buttonFocus( buttonsIds, 1 );

const manageFocus = ( e: KeyboardEvent ): void => manageButtonFocus( e );

let listenerId;

export const onAddKeyDownListener = (): number => {
    listenerId = KeyboardListener.addListener( {
        container,
        listener: [ 'keydown', manageFocus ]
    } );

    return listenerId;
};

export const onRemoveKeyDownListener = (): boolean => {
    return KeyboardListener.removeListener( { container, listenerId } );
};

export default { onAddKeyDownListener, onRemoveKeyDownListener };
