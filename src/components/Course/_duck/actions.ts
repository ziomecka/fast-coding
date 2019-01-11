import { Action, ActionCreator } from 'redux';
import { CourseActionsEnum } from './types';

import { CourseDataType } from './reducers';

const {
    COMPONENTS_COURSE_UPDATE
} = CourseActionsEnum;

export const updateLesson: ActionCreator<UpdateCourseAction> = ( courseData: CourseDataType ) => ( {
    type: COMPONENTS_COURSE_UPDATE,
    courseData
} );

export interface UpdateCourseAction extends Action {
    readonly type: string;
    courseData: CourseDataType;
}

export type CourseActions = Action |
    UpdateCourseAction;
