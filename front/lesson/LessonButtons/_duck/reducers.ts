import { Reducer } from 'redux';

import { LessonButtonsActions, MoveLessonButtonsAction } from './actions';
import { LessonButtonsActionsEnum, LessonButtonsState } from './types';

const {
    LESSON_LESSON_BUTTONS_MOVE,
    LESSON_LESSON_DRAGABLE_TURNON,
    LESSON_LESSON_DRAGABLE_TURNOFF,
    LESSON_LESSON_DRAGABLE_RESET
} = LessonButtonsActionsEnum;

export const INITIAL_STATE: LessonButtonsState = {
    top: 'auto',
    left: 'auto',
    draggable: false
};

const reducer: Reducer<LessonButtonsState, LessonButtonsActions> = ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
        case LESSON_LESSON_BUTTONS_MOVE: {
            const { top, left } = action as MoveLessonButtonsAction;
            return {
                ...state,
                top,
                left
            };
        }

        case LESSON_LESSON_DRAGABLE_TURNON: {
            return {
                ...state,
                draggable: true
            };
        }

        case LESSON_LESSON_DRAGABLE_TURNOFF: {
            return {
                ...state,
                draggable: false
            };
        }

        case LESSON_LESSON_DRAGABLE_RESET: {
            return {
                ...INITIAL_STATE
            };
        }

        default: {
            return { ...state };
        }
    }
};

export { reducer as lessonButtonsReducer };

