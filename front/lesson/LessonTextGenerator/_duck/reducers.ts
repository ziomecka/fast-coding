import { Reducer } from 'redux';

import { LessonTextGeneratorActionsEnum, ILessonTextGeneratorState } from './types';
import { LessonTextGeneratorActions } from './actions';

const {
    LESSON_LESSON_TEXT_GENERATOR_TURNON,
    LESSON_LESSON_TEXT_GENERATOR_TURNOFF
} = LessonTextGeneratorActionsEnum;

export const INITIAL_STATE: ILessonTextGeneratorState = {
    turnedOn: false
};

const reducer: Reducer<ILessonTextGeneratorState, LessonTextGeneratorActions> = ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
        case LESSON_LESSON_TEXT_GENERATOR_TURNON: {
            return {
                ...state,
                turnedOn: true
            };
        }

        case LESSON_LESSON_TEXT_GENERATOR_TURNOFF: {
            return {
                ...state,
                turnedOn: false
            };
        }

        default: {
            return { ...state };
        }
    }
};

export { reducer as lessonTextGeneratorReducer };


