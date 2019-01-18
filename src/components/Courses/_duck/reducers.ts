import { Reducer } from 'redux';

import { CoursesActions } from './actions';
import { CoursesActionsEnum, ICoursesState } from './types';

const {
    COMPONENTS_COURSES_OPEN_COURSE,
    COMPONENTS_COURSES_CLOSE_COURSE,
    COMPONENTS_COURSES_ACTIVATE_LESSON,
    COMPONENTS_COURSES_DEACTIVATE_LESSON
} = CoursesActionsEnum;

export const INITIAL_STATE: ICoursesState = {
    openedCourseId: null,
    activeLessonId: null
};

const reducer: Reducer<ICoursesState, CoursesActions> = ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
        case COMPONENTS_COURSES_OPEN_COURSE: {
            return {
                ...state,
                ...action
            };
        }

        case COMPONENTS_COURSES_CLOSE_COURSE: {
            return {
                ...state,
                openedCourseId: null,
                activeLessonId: null
            };
        }

        case COMPONENTS_COURSES_ACTIVATE_LESSON: {
            return {
                ...state,
                ...action
            };
        }

        case COMPONENTS_COURSES_DEACTIVATE_LESSON: {
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

export { reducer as coursesReducer };
