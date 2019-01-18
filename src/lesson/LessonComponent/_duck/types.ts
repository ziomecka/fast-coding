
import { LessonContainersEnum } from '@lessonTypes';
import { ILessonComponentState } from '../';
import { TextTranslationsI } from '@applicationTypes';

export enum LessonComponentActionsEnum {
    LESSON_LESSON_UPDATE = '@@lesson_component/UPDATE',
    LESSON_LESSON_OPEN = '@@lesson_component/OPEN',
    LESSON_LESSON_TEXT_UPDATE = '@@lesson_component/TEXT_UPDATE',
    LESSON_LESSON_OPEN_DEMO = '@@lesson_component/OPEN_DEMO'
}

// TODO improve. Has to be either text or translatedTexts
interface OriginalLessonData {
    _id: string;
    no: number;
    title: TextTranslationsI;
    text?: string;
    translatedTexts?: TextTranslationsI;
    signs: string[];
    otherSigns: string[];
}

export interface LessonData extends OriginalLessonData {
    lessonText: string;
}

export interface ILessonComponentState extends LessonData {}

export interface IRestoreStateOptions {
    container: LessonContainersEnum,
    clearState?: boolean
}
