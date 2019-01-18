import { ILessonTextGeneratorState, } from '@lesson/LessonTextGenerator/';
import { LessonButtonsState } from '@lesson/LessonButtons/';
import { LessonComparatorState } from '@lesson/LessonComparator/';
import { ILessonComponentState } from '@lesson/LessonComponent/';
import { LessonStatsState } from '@lesson/LessonStats/';

export enum LessonCommonActionsEnum {
    LESSON_LESSON_END = '@@lesson_lesson/END',
    LESSON_LESSON_ENDING = '@@lesson_lesson/ENDING',
    LESSON_LESSON_NOT_ENDING = '@@lesson_lesson/NOT_ENDING',
    LESSON_LESSON_PAUSE = '@@lesson_lesson/PAUSE',
    LESSON_LESSON_RESET = '@@lesson_lesson/RESET',
    LESSON_LESSON_RESTART = '@@lesson_lesson/RESTART',
    LESSON_LESSON_RESTORE_STATE = '@@lesson_lesson/RESTORE_STATE',
    LESSON_LESSON_START = '@@lesson_lesson/START',
    LESSON_LESSON_UNPAUSE = '@@lesson_lesson/UNPAUSE',
}

export enum LessonContainersEnum {
    lessonComparator = 'lessonComparator',
    lessonComponent = 'lessonComponent',
    lessonTextGenerator = 'lessonTextGenerator',
    lessonButtons = 'lessonButtons',
    lessonStats = 'lessonStats'
}

export interface ILessonState extends ILessonCommonState {
    lessonComparator: LessonComparatorState;
    lessonComponent: ILessonComponentState;
    lessonTextGenerator: ILessonTextGeneratorState;
    lessonButtons: LessonButtonsState;
    lessonStats: LessonStatsState;
}

export interface ILessonCommonState {
    started: boolean;
    paused: boolean;
    ended: boolean;
    ending: boolean;
}
