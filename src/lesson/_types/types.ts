import { ILessonTextGeneratorState, } from '@lesson/LessonTextGenerator/';
import { LessonButtonsState } from '@lesson/LessonButtons/';
import { LessonComparatorState } from '@lesson/LessonComparator/';
import { ILessonComponentState } from '@lesson/LessonComponent/';
import { LessonStatsState } from '@lesson/LessonStats/';

export enum LessonContainersEnum {
    lessonComparator = 'lessonComparator',
    lessonComponent = 'lessonComponent',
    lessonTextGenerator = 'lessonTextGenerator',
    lessonButtons = 'lessonButtons',
    lessonStats = 'lessonStats'
}

export interface ILessonState {
    lessonComparator: LessonComparatorState;
    lesson: ILessonComponentState;
    lessonTextGenerator: ILessonTextGeneratorState;
    lessonButtons: LessonButtonsState;
    lessonStats: LessonStatsState;
}
