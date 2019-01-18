import { ICourseData } from '@courses/CoursesLoader/_duck/types';

export type LocalStorageDataTypes = ICourseData;

export enum LocalStorageItemEnum {
    courses = 'COURSES',
    lessonComparator = 'LESSON_COMPARATOR',
    lesson = 'LESSON',
    lessonStats = 'LESSON_STATS'
}
