import { combineReducers } from 'redux';

import {
    LessonComparatorState,
    lessonComparatorReducer,
    INITIAL_STATE as LESSON_COMPARATOR_INITIAL_STATE
} from '@lesson/LessonComparator/';

import {
    LessonState,
    lessonReducer,
    INITIAL_STATE as LESSON_INITIAL_STATE
} from '@lesson/Lesson/';

import {
    ILessonTextGeneratorState,
    lessonTextGeneratorReducer,
    INITIAL_STATE as LESSON_TEXT_GENERATOR_INITIAL_STATE
} from '@lesson/LessonTextGenerator/';

import {
    LessonButtonsState,
    lessonButtonsReducer,
    INITIAL_STATE as LESSONBUTTONS_INITIAL_STATE
} from '@lesson/LessonButtons/';

import {
    INITIAL_STATE as LESSON_STATS_INITIAL_STATE,
    lessonStatsReducer,
    LessonStatsState
} from '@lesson/LessonStats/';

export const INITIAL_STATE = {
    lessonComparator: { ...LESSON_COMPARATOR_INITIAL_STATE },
    lesson: { ...LESSON_INITIAL_STATE },
    lessonTextGenerator: { ...LESSON_TEXT_GENERATOR_INITIAL_STATE },
    lessonButtons: { ...LESSONBUTTONS_INITIAL_STATE },
    lessonStats: { ...LESSON_STATS_INITIAL_STATE }
};

const reducer = combineReducers( {
    lesson: lessonReducer,
    lessonComparator: lessonComparatorReducer,
    lessonTextGenerator: lessonTextGeneratorReducer,
    lessonButtons: lessonButtonsReducer,
    lessonStats: lessonStatsReducer
} );

export { reducer as lessonReducer };

export interface LessonState {
    lessonComparator: LessonComparatorState;
    lesson: LessonState;
    lessonTextGenerator: ILessonTextGeneratorState;
    lessonButtons: LessonButtonsState;
    lessonStats: LessonStatsState;
}
