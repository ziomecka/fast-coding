import { Dispatch } from 'redux';

import { turnOnTextGenerator } from '../../TextGenerator/_duck/actions';
import { updateLesson } from '../../Lesson/_duck/actions';

import { LessonData } from '../../Lesson/_duck/reducers';
import { openLesson } from '../../Lesson/_duck/actions';

import { ThunkGetStateType } from '../../../_common/';

import { getActiveLanguage } from 'react-localize-redux';

export const onOpenRandomLesson = (lesson: LessonData): any => (
    async (dispatch: Dispatch ) => {
        const response = await dispatch(updateLesson(lesson));
        if (response) {
            return dispatch(turnOnTextGenerator());
        }
        return response;
    }
);

export const onOpenLesson = (lessonData: LessonData): any => (dispatch: Dispatch, getState: ThunkGetStateType) => {
    const { code } = getActiveLanguage(getState().localize);

    lessonData.lessonText = (lessonData.translatedTexts && lessonData.translatedTexts[code]) ||
        lessonData.text ||
        '';

    return dispatch(openLesson(lessonData));
};