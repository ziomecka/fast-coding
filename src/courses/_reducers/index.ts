import { combineReducers } from 'redux';

import {
    ICoursesLoaderState,
    coursesLoaderReducer,
    INITIAL_STATE as COURSES_LOADER_INITIAL_STATE
} from '@courses/CoursesLoader/';

import {
    INITIAL_STATE as COURSES_INITIAL_STATE,
    ICoursesState,
    coursesReducer
} from '@courses/Courses/';

export const INITIAL_STATE = {
    courses: { ...COURSES_INITIAL_STATE },
    coursesLoader: { ...COURSES_LOADER_INITIAL_STATE },
};

const reducer = combineReducers( {
    courses: coursesReducer,
    coursesLoader: coursesLoaderReducer,
} );

export { reducer as coursesReducer };

export interface CoursesState {
    courses: ICoursesState;
    coursesLoader: ICoursesLoaderState;
}
