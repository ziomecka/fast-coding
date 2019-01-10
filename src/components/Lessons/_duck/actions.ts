import { Action, ActionCreator } from 'redux';
import { LessonsActionsEnum } from './types';

const {
    COMPONENTS_LESSONS_OPEN_COURSE,
    COMPONENTS_LESSONS_CLOSE_COURSE,
    COMPONENTS_LESSONS_ACTIVATE_LESSON,
    COMPONENTS_LESSONS_DEACTIVATE_LESSON
} = LessonsActionsEnum;

export const openCourse: ActionCreator<OpenCourseAction> = (openedCourseId: string) => ({
    type: COMPONENTS_LESSONS_OPEN_COURSE,
    openedCourseId
});

export const closeCourse: ActionCreator<CloseCourseAction> = (openedCourseId: string) => ({
    type: COMPONENTS_LESSONS_CLOSE_COURSE,
    openedCourseId
});

export const activateLesson: ActionCreator<ActivateLessonAction> = (activeLessonId: string) => ({
    type: COMPONENTS_LESSONS_ACTIVATE_LESSON,
    activeLessonId
});

export const deactivateLesson: ActionCreator<DeactivateLessonAction> = (activeLessonId: string) => ({
    type: COMPONENTS_LESSONS_DEACTIVATE_LESSON,
    activeLessonId
});

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

export type LessonsActions =
    OpenCourseAction |
    CloseCourseAction |
    ActivateLessonAction |
    DeactivateLessonAction;