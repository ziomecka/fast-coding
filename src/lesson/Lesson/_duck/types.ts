
import {
    RestoreStateAction as LessonComparatorRestoreStateAction,
} from '@lesson/LessonComparator/';

import { LessonContainersEnum } from '@lessonTypes';
import { RestoreStateAction as LessonRestoreStateAction } from './actions';
import { LessonState } from '../';
import { RestoreStateAction as LessonStatsRestoreStateAction } from '@lesson/LessonStats/';
import { LocalStorageItemEnum } from '@appTypes';
import { TextTranslationsI } from '@applicationTypes';

export enum LessonActionsEnum {
    LESSON_LESSON_UPDATE = '@@lesson_lesson/UPDATE',
    LESSON_LESSON_OPEN = '@@lesson_lesson/OPEN',
    LESSON_LESSON_TEXT_UPDATE = '@@lesson_lesson/TEXT_UPDATE',
    LESSON_LESSON_START = '@@lesson_lesson/START',
    LESSON_LESSON_PAUSE = '@@lesson_lesson/PAUSE',
    LESSON_LESSON_UNPAUSE = '@@lesson_lesson/UNPAUSE',
    LESSON_LESSON_ENDING = '@@lesson_lesson/ENDING',
    LESSON_LESSON_NOT_ENDING = '@@lesson_lesson/NOT_ENDING',
    LESSON_LESSON_END = '@@lesson_lesson/END',
    LESSON_LESSON_RESET = '@@lesson_lesson/RESET',
    LESSON_LESSON_OPEN_DEMO = '@@lesson_lesson/OPEN_DEMO',
    LESSON_LESSON_RESTART = '@@lesson_lesson/RESTART',
    LESSON_LESSON_RESTORE_STATE = '@@lesson_lesson/RESTORE_STATE'
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
    started: boolean;
    paused: boolean;
    ended: boolean;
    ending: boolean;
}

export interface LessonState extends LessonData {}

export interface IRestoreStateOptions {
    localStorageItem: LocalStorageItemEnum,
    action: ( data ) => LessonRestoreStateAction | LessonStatsRestoreStateAction | LessonComparatorRestoreStateAction,
    clearState?: boolean
}

export interface IKeepStateOptions {
    localStorageItem: LocalStorageItemEnum,
    container: LessonContainersEnum
}
