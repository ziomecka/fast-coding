import { Reducer } from 'redux';

import { LessonActionsEnum } from './types';
import {
    LessonActions,
    OpenLessonAction,
    UpdateTextAction,
    OpenDemoLessonAction,
    RestoreStateAction
} from './actions';

import { LESSON_DEMO_TITLE, LESSON_DEMO_TEXT } from '../../../constants';

import { TextTranslationsI } from '@componentsTypes';
import { LanguagesEnum } from '@applicationTypes';

const { en, pl } = LanguagesEnum;

const {
    COMPONENTS_LESSON_OPEN,
    COMPONENTS_LESSON_TEXT_UPDATE,
    COMPONENTS_LESSON_UPDATE,
    COMPONENTS_LESSON_START,
    COMPONENTS_LESSON_PAUSE,
    COMPONENTS_LESSON_UNPAUSE,
    COMPONENTS_LESSON_END,
    COMPONENTS_LESSON_ENDING,
    COMPONENTS_LESSON_NOT_ENDING,
    COMPONENTS_LESSON_RESET,
    COMPONENTS_LESSON_OPEN_DEMO,
    COMPONENTS_LESSON_RESTART,
    COMPONENTS_LESSON_RESTORE_STATE
} = LessonActionsEnum;

export const INITIAL_STATE: LessonState = {
    _id: 0,
    title: {
        [en]: '',
        [pl]: '',
    },
    text: '',
    lessonText: '',
    signs: [],
    otherSigns: [],
    started: false,
    paused: false,
    ended: false,
    ending: false,
};

const reducer: Reducer<LessonState, LessonActions> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case COMPONENTS_LESSON_UPDATE:
        case COMPONENTS_LESSON_OPEN: {
            return {
                ...state,
                ...(action as OpenLessonAction).lessonData
            };
        }

        case COMPONENTS_LESSON_TEXT_UPDATE: {
            return {
                ...state,
                text: (action as UpdateTextAction).text
            };
        }

        case COMPONENTS_LESSON_START: {
            return {
                ...state,
                started: true
            };
        }

        case COMPONENTS_LESSON_ENDING: {
            return {
                ...state,
                ended: false,
                ending: true
            };
        }

        case COMPONENTS_LESSON_NOT_ENDING: {
            return {
                ...state,
                ending: false,
            };
        }

        case COMPONENTS_LESSON_END: {
            return {
                ...state,
                ending: false,
                ended: true
            };
        }

        case COMPONENTS_LESSON_RESET: {
            return {
                ...INITIAL_STATE,
                signs: [],
                otherSigns: [],
            };
        }

        case COMPONENTS_LESSON_RESTART: {
            return {
                ...state,
                started: false,
                ended: false,
                ending: false
            };
        }

        case COMPONENTS_LESSON_OPEN_DEMO: {
            const { language } = action as OpenDemoLessonAction;

            return {
                ...INITIAL_STATE,
                signs: [],
                otherSigns: [],
                lessonText: LESSON_DEMO_TEXT[language],
                text: '',
                title: LESSON_DEMO_TITLE[language]
            };
        }

        case COMPONENTS_LESSON_PAUSE: {
            return {
                ...state,
                paused: true
            };
        }

        case COMPONENTS_LESSON_UNPAUSE: {
            return {
                ...state,
                paused: false
            };
        }

        case COMPONENTS_LESSON_RESTORE_STATE: {
            return {
                ...(action as RestoreStateAction).state
            };
        }

        default: {
            return { ...state };
        }
    }
}

export { reducer as lessonReducer };

// TODO improve. Has to be either text or translatedTexts
export interface OriginalLessonData {
    _id: number;
    title: TextTranslationsI;
    text?: string;
    translatedTexts?: TextTranslationsI;
    signs: string[];
    otherSigns: string[];
};

export interface LessonData extends OriginalLessonData {
    lessonText: string;
    started: boolean;
    paused: boolean;
    ended: boolean;
    ending: boolean;
};

export interface LessonState extends LessonData {};