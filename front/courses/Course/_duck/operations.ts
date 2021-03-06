import { Dispatch } from 'redux';

import { turnOnLessonTextGenerator } from '@lesson/LessonTextGenerator/';

import {
    LessonData,
    openLesson,
    updateLesson
} from '@lesson/LessonComponent/';

import { ThunkGetStateType } from '@applicationTypes';
import { LocalStorageItemEnum } from '@appTypes';

import { getActiveLanguage } from 'react-localize-redux';
import { localStorageRemoveItem } from '@app/LocalStorage/_duck/operations';

import { activateLesson } from '@courses/Courses/';

const { lesson } = LocalStorageItemEnum;

const clearLocalStorage = () => localStorageRemoveItem( lesson );

export const onOpenRandomLesson = ( lesson: LessonData ): any => {
    /** When new lesson opened - clear local storage */
    clearLocalStorage();

    return async ( dispatch: Dispatch ) => {
        const response = await dispatch( updateLesson( lesson ) );
        if ( response ) {
            return dispatch( turnOnLessonTextGenerator() );
        }
        return response;
    };
};

export const onOpenLesson = ( lessonData: LessonData ): any => ( dispatch: Dispatch, getState: ThunkGetStateType ) => {
    const { code } = getActiveLanguage( getState().localize );

    /** When new lesson opened - clear local storage */
    clearLocalStorage();

    lessonData.lessonText = ( lessonData.translatedTexts && lessonData.translatedTexts[ code ] ) ||
        lessonData.text ||
        '';

    /** Set activeLessonId in lessons state */
    dispatch( activateLesson( lessonData._id ) );
    return dispatch( openLesson( lessonData ) );
};
