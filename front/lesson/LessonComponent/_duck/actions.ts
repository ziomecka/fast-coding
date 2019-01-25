import { Action, ActionCreator } from 'redux';
import {
    LessonComponentActionsEnum,
    LessonData
} from './types';

import { LanguagesEnum } from '@applicationTypes';

const {
    LESSON_LESSON_OPEN,
    LESSON_LESSON_TEXT_UPDATE,
    LESSON_LESSON_UPDATE, // TODO?
    LESSON_LESSON_OPEN_DEMO,
} = LessonComponentActionsEnum;

export const openLesson: ActionCreator<OpenLessonAction> = ( lessonData: LessonData ) => ( {
    type: LESSON_LESSON_OPEN,
    lessonData
} );

export const updateText: ActionCreator<UpdateTextAction> = ( text: string ) => ( {
    type: LESSON_LESSON_TEXT_UPDATE,
    text
} );

// TODO sa dwie takie same akcje, remove one
export const updateLesson: ActionCreator<OpenLessonAction> = ( lessonData: LessonData ) => ( {
    type: LESSON_LESSON_OPEN,
    lessonData
} );

export const openDemoLesson: ActionCreator<OpenDemoLessonAction> = ( language: LanguagesEnum ) => ( {
    type: LESSON_LESSON_OPEN_DEMO,
    language
} );

export default {};

export interface OpenLessonAction extends Action {
    readonly type: string;
    lessonData: LessonData;
}

export interface UpdateTextAction extends Action {
    readonly type: string;
    text: string;
}

export interface OpenDemoLessonAction extends Action {
    readonly type: string;
    language: LanguagesEnum;
}

export type LessonComponentActions = Action |
    OpenLessonAction |
    UpdateTextAction |
    OpenDemoLessonAction;
