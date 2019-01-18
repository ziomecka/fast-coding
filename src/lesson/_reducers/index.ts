import { combineReducers, Reducer } from 'redux';

import {
    lessonComparatorReducer,
    INITIAL_STATE as LESSON_COMPARATOR_INITIAL_STATE
} from '@lesson/LessonComparator/';

import {
    lessonReducer,
    INITIAL_STATE as LESSON_INITIAL_STATE
} from '@lesson/Lesson/';

import {
    lessonTextGeneratorReducer,
    INITIAL_STATE as LESSON_TEXT_GENERATOR_INITIAL_STATE
} from '@lesson/LessonTextGenerator/';

import {
    lessonButtonsReducer,
    INITIAL_STATE as LESSONBUTTONS_INITIAL_STATE
} from '@lesson/LessonButtons/';

import {
    INITIAL_STATE as LESSON_STATS_INITIAL_STATE,
    lessonStatsReducer,
} from '@lesson/LessonStats/';

import { ILessonState } from '../_types/index';

export const INITIAL_STATE = {
    lessonComparator: { ...LESSON_COMPARATOR_INITIAL_STATE },
    lesson: { ...LESSON_INITIAL_STATE },
    lessonTextGenerator: { ...LESSON_TEXT_GENERATOR_INITIAL_STATE },
    lessonButtons: { ...LESSONBUTTONS_INITIAL_STATE },
    lessonStats: { ...LESSON_STATS_INITIAL_STATE }
};

const reducer: Reducer<ILessonState> = combineReducers( {
    lesson: lessonReducer,
    lessonComparator: lessonComparatorReducer,
    lessonTextGenerator: lessonTextGeneratorReducer,
    lessonButtons: lessonButtonsReducer,
    lessonStats: lessonStatsReducer
} );

export { reducer as lessonReducer };

