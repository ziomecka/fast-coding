import { MediaEnum } from '@app/Media/';

export enum CoursesActionsEnum {
    COURSES_COURSES_OPEN_COURSE = '@@courses_courses/OPEN_COURSE',
    COURSES_COURSES_CLOSE_COURSE = '@@courses_courses/CLOSE_COURSE',
    COURSES_COURSES_ACTIVATE_LESSON = '@@courses_courses/ACTIVATE_LESSON',
    COURSES_COURSES_DEACTIVATE_LESSON = '@@courses_courses/DEACTIVATE_LESSON'
}

// TODO one type for grids
export type CoursesGrid = Map<MediaEnum, { cols: number }>;

export interface ICoursesState {
    openedCourseId: string;
    activeLessonId: string;
}
