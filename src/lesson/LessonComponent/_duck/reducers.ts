import { Reducer } from 'redux';

import { LessonComponentActionsEnum, ILessonComponentState } from './types';
import {
    LessonComponentActions,
    OpenLessonAction,
    UpdateTextAction,
    OpenDemoLessonAction
} from './actions';

import { LESSON_DEMO_TITLE, LESSON_DEMO_TEXT } from '../constants';


import { LanguagesEnum } from '@applicationTypes';

const { en, pl } = LanguagesEnum;

const {
    LESSON_LESSON_OPEN,
    LESSON_LESSON_TEXT_UPDATE,
    LESSON_LESSON_UPDATE,
    LESSON_LESSON_OPEN_DEMO,
} = LessonComponentActionsEnum;

export const INITIAL_STATE: ILessonComponentState = {
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
};

const reducer: Reducer<ILessonComponentState, LessonComponentActions> = ( state = INITIAL_STATE, action ) => {
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

        default: {
            return { ...state };
        }
    }
};

export { reducer as lessonComponentReducer };


