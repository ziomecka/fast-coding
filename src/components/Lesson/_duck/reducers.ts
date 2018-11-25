import { Reducer } from 'redux';

import { LessonTypes } from './types';
import { LessonActions, OpenLessonAction, UpdateTextAction } from './actions';
import { LESSON_DEMO_TITLE, LESSON_DEMO_TEXT } from '../../../constants';

const {
    COMPONENTS_LESSON_OPEN,
    COMPONENTS_LESSON_TEXT_UPDATE,
    COMPONENTS_LESSON_UPDATE,
    COMPONENTS_LESSON_START,
    COMPONENTS_LESSON_END,
    COMPONENTS_LESSON_ENDING,
    COMPONENTS_LESSON_NOT_ENDING,
    COMPONENTS_LESSON_RESET,
    COMPONENTS_LESSON_OPEN_DEMO
} = LessonTypes;

export const INITIAL_STATE: LessonState = {
    _id: 0,
    title: '',
    text: '',
    signs: [],
    otherSigns: [],
    started: false,
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

        case COMPONENTS_LESSON_OPEN_DEMO: {
            return {
                ...INITIAL_STATE,
                signs: [],
                otherSigns: [],
                text: LESSON_DEMO_TEXT,
                title: LESSON_DEMO_TITLE
            };
        }

        default: {
            return { ...state };
        }
    }
}

export { reducer as lessonReducer };

export interface LessonData {
    _id: number;
    title: string;
    text: string;
    signs: string[];
    otherSigns: string[];
    started: boolean;
    ended: boolean;
    ending: boolean;
};

export interface LessonState extends LessonData {};