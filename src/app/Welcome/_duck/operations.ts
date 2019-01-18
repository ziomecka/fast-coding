import { Dispatch } from 'redux';

import { ThunkGetStateType } from '@applicationTypes';
import { LocalStorageItemEnum, AppContainersEnum } from '@appTypes';

import { openDemoLesson } from '@components/Lesson/_duck/actions';

import { getActiveLanguage } from 'react-localize-redux';

import { localStorageRemoveItem } from '@app/LocalStorage/_duck/operations';

/** Keyboard listener imports */
import { manageButtonFocus as buttonFocus } from '@shared/button.focus';
import * as manageKeydownListeners from '@app/KeyboardListener/_duck/operations';

const { lessonComparator, lesson, lessonStats } = LocalStorageItemEnum;

const clearLocalStorage = () => {
    localStorageRemoveItem( lessonComparator );
    localStorageRemoveItem( lesson );
    localStorageRemoveItem( lessonStats );
};

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
    listenerId = manageKeydownListeners.onAddListener( {
        container,
        listener: [ 'keydown', manageFocus ]
    } );

    return listenerId;
};

export const onRemoveKeyDownListener = (): boolean => {
    return manageKeydownListeners.onRemoveListener( { container, listenerId } );
};
