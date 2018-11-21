import { Reducer } from 'redux';

import { LessonTypes } from './types';
import { LessonActions, OpenLessonAction, UpdateTextAction } from './actions';

const {
    COMPONENTS_LESSON_OPEN,
    COMPONENTS_LESSON_TEXT_UPDATE,
    COMPONENTS_LESSON_UPDATE
} = LessonTypes;

export const INITIAL_STATE: LessonState = {
    _id: 0,
    title: '',
    text: '',
    signs: [],
    otherSigns: []
};

const reducer: Reducer<LessonState, LessonActions> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case COMPONENTS_LESSON_UPDATE:
        case COMPONENTS_LESSON_OPEN: {
            console.log("action");
            console.log(action);
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
};

export interface LessonState extends LessonData {};