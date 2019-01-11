import { Reducer } from 'redux';

import { LessonsActions } from './actions';
import { LessonsActionsEnum } from './types';

const {
    COMPONENTS_LESSONS_OPEN_COURSE,
    COMPONENTS_LESSONS_CLOSE_COURSE,
    COMPONENTS_LESSONS_ACTIVATE_LESSON,
    COMPONENTS_LESSONS_DEACTIVATE_LESSON
} = LessonsActionsEnum;

export const INITIAL_STATE: ILessonsState = {
    openedCourseId: null,
    activeLessonId: null
};

const reducer: Reducer<ILessonsState, LessonsActions> = ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
        case COMPONENTS_LESSONS_OPEN_COURSE: {
            return {
                ...state,
                ...action
            };
        }

        case COMPONENTS_LESSONS_CLOSE_COURSE: {
            return {
                ...state,
                openedCourseId: null,
                activeLessonId: null
            };
        }

        case COMPONENTS_LESSONS_ACTIVATE_LESSON: {
            return {
                ...state,
                ...action
            };
        }

        case COMPONENTS_LESSONS_DEACTIVATE_LESSON: {
            return {
                ...state,
                activeLessonId: null
            };
        }

        default: {
            return { ...state };
        }
    }
};

export { reducer as lessonsReducer };

export interface ILessonsState {
    openedCourseId: string;
    activeLessonId: string;
}
