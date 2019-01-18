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

import { ILessonState, } from '../_types/index';
import { TLessonActions } from '../_actions/';
import { Reducer } from 'redux';
import { onKeepState } from '../Lesson/_duck/operations';

import { stateKeepActions as lessonComparatorStateKeepActions } from '@lesson/LessonComparator/_duck/actions';
import { stateKeepActions as lessonStateKeepActions } from '@lesson/Lesson/_duck/actions';
import { stateKeepActions as lessonStatsKeepActions } from '@lesson/LessonStats/_duck/actions';

import store from '@appStore';

export const INITIAL_STATE = {
    lessonComparator: { ...LESSON_COMPARATOR_INITIAL_STATE },
    lesson: { ...LESSON_INITIAL_STATE },
    lessonTextGenerator: { ...LESSON_TEXT_GENERATOR_INITIAL_STATE },
    lessonButtons: { ...LESSONBUTTONS_INITIAL_STATE },
    lessonStats: { ...LESSON_STATS_INITIAL_STATE }
};

/** Get actions that require keeping the state */
const keepStateActions = [
    ...lessonComparatorStateKeepActions,
    ...lessonStateKeepActions,
    ...lessonStatsKeepActions
];

const reducer: Reducer<ILessonState, TLessonActions> = ( state = INITIAL_STATE, action ) => {
    /** Keep lesson state if the action requires it */
    if ( keepStateActions.indexOf( action.type ) !== -1 ) {
        store.dispatch( onKeepState( state ) );
    }

    return {
        lesson: lessonReducer( state.lesson, action ),
        // @ts-ignore
        lessonComparator: lessonComparatorReducer( state.lessonComparator, action ),
        lessonTextGenerator: lessonTextGeneratorReducer( state.lessonTextGenerator, action ),
        lessonButtons: lessonButtonsReducer( state.lessonButtons, action ),
        lessonStats: lessonStatsReducer( state.lessonStats, action )
    };
};

export { reducer as lessonReducer };

