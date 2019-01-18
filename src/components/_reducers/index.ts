import { combineReducers } from 'redux';

import {
    LessonComparatorState,
    lessonComparatorReducer,
    INITIAL_STATE as LESSON_COMPARATOR_INITIAL_STATE
} from '@components/LessonComparator/';

import {
    LessonState,
    lessonReducer,
    INITIAL_STATE as LESSON_INITIAL_STATE
} from '@components/Lesson/';

import {
    ILessonTextGeneratorState,
    lessonTextGeneratorReducer,
    INITIAL_STATE as LESSON_TEXT_GENERATOR_INITIAL_STATE
} from '@components/LessonTextGenerator/';

import {
    ICoursesLoaderState,
    coursesLoaderReducer,
    INITIAL_STATE as COURSES_LOADER_INITIAL_STATE
} from '@components/CoursesLoader/';

import {
    LessonButtonsState,
    lessonButtonsReducer,
    INITIAL_STATE as LESSONBUTTONS_INITIAL_STATE
} from '@components/LessonButtons/';

import {
    INITIAL_STATE as COURSES_INITIAL_STATE,
    ICoursesState,
    coursesReducer
} from '@components/Courses/';

import {
    INITIAL_STATE as LESSON_STATS_INITIAL_STATE,
    lessonStatsReducer,
    LessonStatsState
} from '@components/LessonStats/';

export const INITIAL_STATE = {
    lessonComparator: { ...LESSON_COMPARATOR_INITIAL_STATE },
    lesson: { ...LESSON_INITIAL_STATE },
    courses: { ...COURSES_INITIAL_STATE },
    lessonTextGenerator: { ...LESSON_TEXT_GENERATOR_INITIAL_STATE },
    coursesLoader: { ...COURSES_LOADER_INITIAL_STATE },
    lessonButtons: { ...LESSONBUTTONS_INITIAL_STATE },
    lessonStats: { ...LESSON_STATS_INITIAL_STATE }
};

const reducer = combineReducers( {
    lesson: lessonReducer,
    lessonComparator: lessonComparatorReducer,
    lessonTextGenerator: lessonTextGeneratorReducer,
    courses: coursesReducer,
    lessonButtons: lessonButtonsReducer,
    coursesLoader: coursesLoaderReducer,
    lessonStats: lessonStatsReducer
} );

export { reducer as componentsReducer };

export interface ComponentsState {
    lessonComparator: LessonComparatorState;
    courses: ICoursesState;
    lesson: LessonState;
    lessonTextGenerator: ILessonTextGeneratorState;
    coursesLoader: ICoursesLoaderState;
    lessonButtons: LessonButtonsState;
    lessonStats: LessonStatsState;
}
