import { ICourseData, ILessonState } from '@applicationTypes';

export type LocalStorageDataTypes = ICourseData | ILessonState;

export enum LocalStorageItemEnum {
    courses = 'COURSES',
    lesson = 'LESSON'
}
