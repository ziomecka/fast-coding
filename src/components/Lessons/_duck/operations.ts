import { Dispatch } from 'redux';

import { turnOnTextGenerator } from '../../TextGenerator/_duck/actions';
import { updateLesson } from '../../Lesson/_duck/actions';

import { LessonData } from '../../Lesson/_duck/reducers';
import { openLesson } from '../../Lesson/_duck/actions';

import { ThunkGetStateType } from '@applicationTypes';
import { LocalStorageItemEnum } from '@appTypes';

import { getActiveLanguage } from 'react-localize-redux';
import { localStorageRemoveItem } from '../../../app/LocalStorage/_duck/operations';

const { comparator, lesson, stats } = LocalStorageItemEnum;

const clearLocalStorage = () => {
    localStorageRemoveItem(comparator);
    localStorageRemoveItem(lesson);
    localStorageRemoveItem(stats);
};

export const onOpenRandomLesson = (lesson: LessonData): any => {
    /** When new lesson opened - clear local storage */
    clearLocalStorage();

    return async (dispatch: Dispatch ) => {
        const response = await dispatch(updateLesson(lesson));
        if (response) {
            return dispatch(turnOnTextGenerator());
        }
        return response;
    }
};

export const onOpenLesson = (lessonData: LessonData): any => (dispatch: Dispatch, getState: ThunkGetStateType) => {
    const { code } = getActiveLanguage(getState().localize);

    /** When new lesson opened - clear local storage */
    clearLocalStorage();

    lessonData.lessonText = (lessonData.translatedTexts && lessonData.translatedTexts[code]) ||
        lessonData.text ||
        '';

    return dispatch(openLesson(lessonData));
};