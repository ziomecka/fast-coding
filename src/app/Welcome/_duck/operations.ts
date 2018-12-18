import { Dispatch } from 'redux';

import { WelcomeClasses } from './reducers';
import { ThunkGetStateType } from '@applicationTypes';
import { AppLocation, LocalStorageItemTypes } from '@appTypes';

import { openDemoLesson } from '../../../components/Lesson/_duck/actions';

import { getActiveLanguage } from 'react-localize-redux';

import { localStorageRemoveItem } from '../../../app/LocalStorage/_duck/operations';

/** Keyboard listener imports */
import { manageButtonFocus as buttonFocus } from '../../../shared/button.focus';
import * as manageKeydownListeners  from '../../../app/KeyboardListener/_duck/operations';
import {  AppContainers } from '@appTypes';

const { comparator, lesson, stats } = LocalStorageItemTypes;

const { isHome, isOther } = AppLocation;

export const classTitleHome = 'welcome welcome-home';
export const classTitleOther = 'welcome welcome-other';
export const classTitleFalling = 'title-falling';

const states: {
    // @ts-ignore
    [key: AppLocation]: WelcomeClasses
} = {
    [isHome]: {
        classAnimated: classTitleFalling,
        classTitle: classTitleHome
    },
    [isOther]: {
        classTitle: classTitleOther,
        classAnimated: '',
    }
};

const clearLocalStorage = () => {
    localStorageRemoveItem(comparator);
    localStorageRemoveItem(lesson);
    localStorageRemoveItem(stats);
};

export const getClasses = (location: AppLocation): WelcomeClasses => {
    return states[location] || states[isOther];
};

export const onOpenDemoLesson = (): any => (dispatch: Dispatch, getState: ThunkGetStateType) => {
    const language = getActiveLanguage(getState().localize).code;

    clearLocalStorage();

    return dispatch(openDemoLesson(language));
};

/** Keyboard listener */
const { welcome: container } = AppContainers;
export const buttonsIds = [ 'homeSeeLessons', 'homeStartTyping' ];

const manageButtonFocus = buttonFocus(buttonsIds, 1);

const manageFocus = (e: KeyboardEvent): void => manageButtonFocus(e);

let listenerId;

export const onAddKeyDownListener = (): any => (dispatch: Dispatch): number => {
    listenerId = dispatch(manageKeydownListeners.onAddListener({
        container,
        listener: [ 'keydown', manageFocus ]
    }));

    return listenerId;
};

export const onRemoveKeyDownListener = (): any => (dispatch: Dispatch): boolean => {
    return dispatch(manageKeydownListeners.onRemoveListener({ container, listenerId }));
};
