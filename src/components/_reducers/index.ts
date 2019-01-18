import { combineReducers } from 'redux';

import {
    ComparatorState,
    comparatorReducer,
    INITIAL_STATE as COMPARATOR_INITIAL_STATE
} from '@components/Comparator/';

import {
    LessonState,
    lessonReducer,
    INITIAL_STATE as LESSON_INITIAL_STATE
} from '@components/Lesson/';

import {
    ITextGeneratorState,
    textGeneratorReducer,
    INITIAL_STATE as TEXT_GENERATOR_INITIAL_STATE
} from '@components/TextGenerator/';

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
    INITIAL_STATE as STATS_INITIAL_STATE,
    statsReducer,
    StatsState
} from '@components/Stats/';

export const INITIAL_STATE = {
    comparator: { ...COMPARATOR_INITIAL_STATE },
    lesson: { ...LESSON_INITIAL_STATE },
    courses: { ...COURSES_INITIAL_STATE },
    textGenerator: { ...TEXT_GENERATOR_INITIAL_STATE },
    coursesLoader: { ...COURSES_LOADER_INITIAL_STATE },
    lessonButtons: { ...LESSONBUTTONS_INITIAL_STATE },
    stats: { ...STATS_INITIAL_STATE }
};

const reducer = combineReducers( {
    lesson: lessonReducer,
    comparator: comparatorReducer,
    textGenerator: textGeneratorReducer,
    courses: coursesReducer,
    lessonButtons: lessonButtonsReducer,
    coursesLoader: coursesLoaderReducer,
    stats: statsReducer
} );

export { reducer as componentsReducer };

export interface ComponentsState {
    comparator: ComparatorState;
    courses: ICoursesState;
    lesson: LessonState;
    textGenerator: ITextGeneratorState;
    coursesLoader: ICoursesLoaderState;
    lessonButtons: LessonButtonsState;
    stats: StatsState;
}
