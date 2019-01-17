import { Reducer } from 'redux';

import { CourseActions } from './actions';
import {
    CourseActionsEnum,
    ICourseState,
 } from './types';

const {
    COMPONENTS_COURSE_UPDATE,
    COMPONENTS_COURSE_INITIAL_STATE_SET
} = CourseActionsEnum;

export const INITIAL_STATE: ICourseState = {};

const reducer: Reducer<ICourseState, CourseActions> = ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
        /* eslint-disable no-empty */
        // TODO code
        case COMPONENTS_COURSE_INITIAL_STATE_SET: {
        }

        // TODO code
        case COMPONENTS_COURSE_UPDATE: {
        }
        /* eslint-enable no-empty */
        default: {
            return { ...state };
        }
    }
};

export { reducer as courseReducer };
