import { MediaEnum } from '@app/Media/';

export enum CoursesActionsEnum {
    COMPONENTS_COURSES_OPEN_COURSE = '@@components_courses/OPEN_COURSE',
    COMPONENTS_COURSES_CLOSE_COURSE = '@@components_courses/CLOSE_COURSE',
    COMPONENTS_COURSES_ACTIVATE_LESSON = '@@components_courses/ACTIVATE_LESSON',
    COMPONENTS_COURSES_DEACTIVATE_LESSON = '@@components_courses/DEACTIVATE_LESSON'
}

// TODO one type for grids
export type CoursesGrid = Map<MediaEnum, { cols: number }>;

export interface ICoursesState {
    openedCourseId: string;
    activeLessonId: string;
}
