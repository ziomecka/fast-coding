import { Action, ActionCreator } from 'redux';
import { CoursesActionsEnum } from './types';

const {
    COURSES_COURSES_OPEN_COURSE,
    COURSES_COURSES_CLOSE_COURSE,
    COURSES_COURSES_ACTIVATE_LESSON,
    COURSES_COURSES_DEACTIVATE_LESSON
} = CoursesActionsEnum;

export const openCourse: ActionCreator<OpenCourseAction> = ( openedCourseId: string ) => ( {
    type: COURSES_COURSES_OPEN_COURSE,
    openedCourseId
} );

export const closeCourse: ActionCreator<CloseCourseAction> = ( openedCourseId: string ) => ( {
    type: COURSES_COURSES_CLOSE_COURSE,
    openedCourseId
} );

export const activateLesson: ActionCreator<ActivateLessonAction> = ( activeLessonId: string ) => ( {
    type: COURSES_COURSES_ACTIVATE_LESSON,
    activeLessonId
} );

export const deactivateLesson: ActionCreator<DeactivateLessonAction> = ( activeLessonId: string ) => ( {
    type: COURSES_COURSES_DEACTIVATE_LESSON,
    activeLessonId
} );

export interface OpenCourseAction extends Action {
    openedCourseId: string;
}

export interface CloseCourseAction extends Action {
    openedCourseId: string;
}

export interface ActivateLessonAction extends Action {
    activeLessonId: string;
}

export interface DeactivateLessonAction extends Action {
    activeLessonId: string;
}

export type CoursesActions =
    OpenCourseAction |
    CloseCourseAction |
    ActivateLessonAction |
    DeactivateLessonAction;
