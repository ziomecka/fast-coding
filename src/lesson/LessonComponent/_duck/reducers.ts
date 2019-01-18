import { Reducer } from 'redux';

import { LessonActionsEnum, LessonState } from './types';
import {
    LessonActions,
    OpenLessonAction,
    UpdateTextAction,
    OpenDemoLessonAction,
    RestoreStateAction
} from './actions';

import { LESSON_DEMO_TITLE, LESSON_DEMO_TEXT } from '../constants';


import { LanguagesEnum } from '@applicationTypes';

const { en, pl } = LanguagesEnum;

const {
    LESSON_LESSON_OPEN,
    LESSON_LESSON_TEXT_UPDATE,
    LESSON_LESSON_UPDATE,
    LESSON_LESSON_START,
    LESSON_LESSON_PAUSE,
    LESSON_LESSON_UNPAUSE,
    LESSON_LESSON_END,
    LESSON_LESSON_ENDING,
    LESSON_LESSON_NOT_ENDING,
    LESSON_LESSON_RESET,
    LESSON_LESSON_OPEN_DEMO,
    LESSON_LESSON_RESTART,
    LESSON_LESSON_RESTORE_STATE
} = LessonActionsEnum;

export const INITIAL_STATE: LessonState = {
    _id: null,
    no: null,
    title: {
        [ en ]: '',
        [ pl ]: '',
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

const reducer: Reducer<LessonState, LessonActions> = ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
        case LESSON_LESSON_UPDATE:
        case LESSON_LESSON_OPEN: {
            return {
                ...state,
                ...( action as OpenLessonAction ).lessonData
            };
        }

        case LESSON_LESSON_TEXT_UPDATE: {
            return {
                ...state,
                text: ( action as UpdateTextAction ).text
            };
        }

        case LESSON_LESSON_START: {
            return {
                ...state,
                started: true
            };
        }

        case LESSON_LESSON_ENDING: {
            return {
                ...state,
                ended: false,
                ending: true
            };
        }

        case LESSON_LESSON_NOT_ENDING: {
            return {
                ...state,
                ending: false,
            };
        }

        case LESSON_LESSON_END: {
            return {
                ...state,
                ending: false,
                ended: true
            };
        }

        case LESSON_LESSON_RESET: {
            return {
                ...INITIAL_STATE,
                signs: [],
                otherSigns: [],
            };
        }

        case LESSON_LESSON_RESTART: {
            return {
                ...state,
                started: false,
                ended: false,
                ending: false
            };
        }

        case LESSON_LESSON_OPEN_DEMO: {
            const { language } = action as OpenDemoLessonAction;

            return {
                ...INITIAL_STATE,
                signs: [],
                otherSigns: [],
                lessonText: LESSON_DEMO_TEXT[ language ],
                text: '',
                title: LESSON_DEMO_TITLE // language is selected in content
            };
        }

        case LESSON_LESSON_PAUSE: {
            return {
                ...state,
                paused: true
            };
        }

        case LESSON_LESSON_UNPAUSE: {
            return {
                ...state,
                paused: false
            };
        }

        case LESSON_LESSON_RESTORE_STATE: {
            return {
                ...( action as RestoreStateAction ).state
            };
        }

        default: {
            return { ...state };
        }
    }
};

export { reducer as lessonReducer };


