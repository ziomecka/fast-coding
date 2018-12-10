import { Dispatch } from 'redux';

import { WelcomeClasses } from './reducers';
import { AppLocation } from '../../_common/';
import { ThunkGetStateType, LocalStorageItemTypes } from '../../../_common/';
import { openDemoLesson } from '../../../components/Lesson/_duck/actions';

import { getActiveLanguage } from 'react-localize-redux';

import { localStorageRemoveItem } from '../../../app/LocalStorage/_duck/operations';

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