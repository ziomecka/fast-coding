import { Reducer } from 'redux';

import { LessonsActions } from './actions';
import { LessonsTypes } from './types';

const {
    COMPONENTS_LESSONS_UPDATE,
    COMPONENTS_LESSONS_INITIAL_STATE_SET
 } = LessonsTypes;

export const INITIAL_STATE: ILessonsState = {};

const reducer: Reducer<ILessonsState, LessonsActions> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case COMPONENTS_LESSONS_INITIAL_STATE_SET: {
        }

        case COMPONENTS_LESSONS_UPDATE: {
        }

        default: {
            return { ...state };
        }
    }
}

export { reducer as lessonsReducer };

interface ILessonData {
    allErrors: number[][];
};

interface ICourseLessonsData {
    [lessonId: string]: ILessonData;
};

export type CourseDataType = ICourseLessonsData & {
    lastLesson: number;
}

export interface ILessonsState {
    [courseId: string]: CourseDataType
};