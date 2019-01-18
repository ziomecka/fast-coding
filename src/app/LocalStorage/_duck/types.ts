import { LessonsDataI } from '@components/CoursesLoader/_duck/types';

export type LocalStorageDataTypes = LessonsDataI;

export enum LocalStorageItemEnum {
    lessons = 'LESSONS',
    comparator = 'COMPARATOR',
    lesson = 'LESSON',
    stats = 'STATS'
}
