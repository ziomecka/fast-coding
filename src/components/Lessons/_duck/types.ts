import { MediaEnum } from '@app/Media/';

export enum LessonsActionsEnum {
    COMPONENTS_LESSONS_OPEN_COURSE = '@@components_lessons/OPEN_COURSE',
    COMPONENTS_LESSONS_CLOSE_COURSE = '@@components_lessons/CLOSE_COURSE',
    COMPONENTS_LESSONS_ACTIVATE_LESSON = '@@components_lessons/ACTIVATE_LESSON',
    COMPONENTS_LESSONS_DEACTIVATE_LESSON = '@@components_lessons/DEACTIVATE_LESSON'
}

// TODO one type for grids
export type LessonsGrid = Map<MediaEnum, { cols: number }>;

export interface ILessonsState {
    openedCourseId: string;
    activeLessonId: string;
}
