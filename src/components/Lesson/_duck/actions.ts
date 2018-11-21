import { Action, ActionCreator } from 'redux';
import { LessonTypes } from './types';

import { LessonData} from './reducers';

const {
    COMPONENTS_LESSON_OPEN,
    COMPONENTS_LESSON_TEXT_UPDATE,
    COMPONENTS_LESSON_UPDATE
} = LessonTypes;

export const openLesson: ActionCreator<OpenLessonAction> = (lessonData: LessonData) => ({
    type: COMPONENTS_LESSON_OPEN,
    lessonData
});

export const updateText: ActionCreator<UpdateTextAction> = (text: string) => ({
    type: COMPONENTS_LESSON_TEXT_UPDATE,
    text
});

// TODO sa dwie takie same akcje, remove one
export const updateLesson: ActionCreator<OpenLessonAction> = (lessonData: LessonData) => ({
    type: COMPONENTS_LESSON_OPEN,
    lessonData
});

export interface OpenLessonAction extends Action {
    readonly type: string;
    lessonData: LessonData;
};

export interface UpdateTextAction extends Action {
    readonly type: string;
    text: string;
};

export type LessonActions = OpenLessonAction |
    UpdateTextAction;