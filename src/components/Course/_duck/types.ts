import { MediaEnum } from '@app/Media/';

export enum CourseActionsEnum {
    COMPONENTS_COURSE_UPDATE = '@@components_course/LAST_LESSON_UPDATE',
    COMPONENTS_COURSE_INITIAL_STATE_SET = '@@components_course/INITIAL_STATE_SET'
}

export enum LessonsTypesEnum {
    review = 'review'
}

export type CourseGrid = Map< MediaEnum, { cols: number, cellHeight: number }>;
