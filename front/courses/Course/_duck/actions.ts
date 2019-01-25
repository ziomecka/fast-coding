import { Action, ActionCreator } from 'redux';
import {
    CourseActionsEnum,
    CourseDataType
} from './types';

const {
    COURSES_COURSE_UPDATE
} = CourseActionsEnum;

export const updateLesson: ActionCreator<UpdateCourseAction> = ( courseData: CourseDataType ) => ( {
    type: COURSES_COURSE_UPDATE,
    courseData
} );

export interface UpdateCourseAction extends Action {
    readonly type: string;
    courseData: CourseDataType;
}

export type CourseActions = Action |
    UpdateCourseAction;
