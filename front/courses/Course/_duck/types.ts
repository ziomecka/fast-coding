import { MediaEnum } from '@app/Media/';

export enum CourseActionsEnum {
    COURSES_COURSE_UPDATE = '@@courses_course/LAST_LESSON_UPDATE',
    COURSES_COURSE_INITIAL_STATE_SET = '@@courses_course/INITIAL_STATE_SET'
}

export enum LessonsTypesEnum {
    review = 'review'
}

export type CourseGrid = Map< MediaEnum, { cols: number, cellHeight: number, rows: number }>;

interface ILessonData {
    allErrors: number[][];
}

interface ICourseCourseData {
    [lessonId: string]: ILessonData;
}

export type CourseDataType = ICourseCourseData & {
    lastLesson: number;
};

export interface ICourseState {
    [ courseId: string ]: CourseDataType
}
