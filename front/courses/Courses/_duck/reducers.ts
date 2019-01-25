import { Reducer } from 'redux';

import { CoursesActions } from './actions';
import { CoursesActionsEnum, ICoursesState } from './types';

const {
    COURSES_COURSES_OPEN_COURSE,
    COURSES_COURSES_CLOSE_COURSE,
    COURSES_COURSES_ACTIVATE_LESSON,
    COURSES_COURSES_DEACTIVATE_LESSON
} = CoursesActionsEnum;

export const INITIAL_STATE: ICoursesState = {
    openedCourseId: null,
    activeLessonId: null
};

const reducer: Reducer<ICoursesState, CoursesActions> = ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
        case COURSES_COURSES_OPEN_COURSE: {
            return {
                ...state,
                ...action
            };
        }

        case COURSES_COURSES_CLOSE_COURSE: {
            return {
                ...state,
                openedCourseId: null,
                activeLessonId: null
            };
        }

        case COURSES_COURSES_ACTIVATE_LESSON: {
            return {
                ...state,
                ...action
            };
        }

        case COURSES_COURSES_DEACTIVATE_LESSON: {
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
