import { ComponentsContainersEnum, TextTranslationsI } from '@componentsTypes';

import {
    RestoreStateAction as LessonComparatorRestoreStateAction,
} from '@components/LessonComparator/';

import { RestoreStateAction as LessonRestoreStateAction } from './actions';
import { LessonState } from '../';
import { RestoreStateAction as LessonStatsRestoreStateAction } from '@components/LessonStats/';
import { LocalStorageItemEnum } from '@appTypes';

export enum LessonActionsEnum {
    COMPONENTS_LESSON_UPDATE = '@@components_lesson/UPDATE',
    COMPONENTS_LESSON_OPEN = '@@components_lesson/OPEN',
    COMPONENTS_LESSON_TEXT_UPDATE = '@@components_lesson/TEXT_UPDATE',
    COMPONENTS_LESSON_START = '@@components_lesson/START',
    COMPONENTS_LESSON_PAUSE = '@@components_lesson/PAUSE',
    COMPONENTS_LESSON_UNPAUSE = '@@components_lesson/UNPAUSE',
    COMPONENTS_LESSON_ENDING = '@@components_lesson/ENDING',
    COMPONENTS_LESSON_NOT_ENDING = '@@components_lesson/NOT_ENDING',
    COMPONENTS_LESSON_END = '@@components_lesson/END',
    COMPONENTS_LESSON_RESET = '@@components_lesson/RESET',
    COMPONENTS_LESSON_OPEN_DEMO = '@@components_lesson/OPEN_DEMO',
    COMPONENTS_LESSON_RESTART = '@@components_lesson/RESTART',
    COMPONENTS_LESSON_RESTORE_STATE = '@@components_lesson/RESTORE_STATE'
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
    container: ComponentsContainersEnum
}
