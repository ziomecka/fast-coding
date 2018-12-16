import { Action, ActionCreator } from 'redux';
import { LessonsTypes } from './types';

import { CourseDataType } from './reducers';

const {
    COMPONENTS_LESSONS_UPDATE
} = LessonsTypes;

export const updateLesson: ActionCreator<UpdateLessonsAction> = (courseData: CourseDataType) => ({
    type: COMPONENTS_LESSONS_UPDATE,
    courseData
});

export interface UpdateLessonsAction extends Action {
    readonly type: string;
    courseData: CourseDataType;
};

export type LessonsActions = Action |
    UpdateLessonsAction;