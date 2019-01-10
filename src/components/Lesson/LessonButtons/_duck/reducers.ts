import { Reducer } from 'redux';

import { LessonButtonsActions, MoveLessonButtonsAction } from './actions';
import { LessonButtonsActionsEnum } from './types';

const {
    COMPONENTS_LESSON_BUTTONS_MOVE,
    COMPONENTS_LESSON_DRAGABLE_TURNON,
    COMPONENTS_LESSON_DRAGABLE_TURNOFF,
    COMPONENTS_LESSON_DRAGABLE_RESET
} = LessonButtonsActionsEnum;

export const INITIAL_STATE: LessonButtonsState = {
    top: 'auto',
    left: 'auto',
    draggable: false
};

const reducer: Reducer<LessonButtonsState, LessonButtonsActions> = ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
        case COMPONENTS_LESSON_BUTTONS_MOVE: {
            const { top, left } = action as MoveLessonButtonsAction;
            return {
                ...state,
                top,
                left
            };
        }

        case COMPONENTS_LESSON_DRAGABLE_TURNON: {
            return {
                ...state,
                draggable: true
            };
        }

        case COMPONENTS_LESSON_DRAGABLE_TURNOFF: {
            return {
                ...state,
                draggable: false
            };
        }

        case COMPONENTS_LESSON_DRAGABLE_RESET: {
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

export interface LessonButtonsState {
    left: number | 'auto';
    top: number | 'auto';
    draggable: boolean;
}