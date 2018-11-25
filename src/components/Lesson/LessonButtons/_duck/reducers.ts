import { Reducer } from 'redux';

import { LessonButtonsActions } from './actions';
import { LessonButtonsTypes } from './types';

import { LESSON_BUTTONS_TOP, LESSON_BUTTONS_LEFT } from '../../../../constants';

const {
    COMPONENTS_LESSON_BUTTONS_MOVE
} = LessonButtonsTypes;

export const INITIAL_STATE: LessonButtonsState = {
    top: LESSON_BUTTONS_TOP,
    left: LESSON_BUTTONS_LEFT
};

const reducer: Reducer<LessonButtonsState, LessonButtonsActions> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case COMPONENTS_LESSON_BUTTONS_MOVE: {
            const { top, left } = action;
            return {
                top,
                left
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
};