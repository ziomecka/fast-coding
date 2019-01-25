import { Reducer } from 'redux';

import {
    lessonCommonReducer,
    LESSON_COMMON_INITIAL_STATE
} from '@lesson/_reducers/reducer';

import {
    lessonComparatorReducer,
    INITIAL_STATE as LESSON_COMPARATOR_INITIAL_STATE
} from '@lesson/LessonComparator/';

import {
    lessonComponentReducer,
    INITIAL_STATE as LESSON_COMPONENT_INITIAL_STATE
} from '@lesson/LessonComponent/';

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

import { ILessonState } from '../_types/';
import { TLessonActions } from '../_actions/';

export const INITIAL_STATE = {
    ...LESSON_COMMON_INITIAL_STATE,
    lessonComparator: { ...LESSON_COMPARATOR_INITIAL_STATE },
    lessonComponent: { ...LESSON_COMPONENT_INITIAL_STATE },
    lessonTextGenerator: { ...LESSON_TEXT_GENERATOR_INITIAL_STATE },
    lessonButtons: { ...LESSONBUTTONS_INITIAL_STATE },
    lessonStats: { ...LESSON_STATS_INITIAL_STATE },
};

import { LessonCommonActionsEnum } from '@lesson/_types/';


const lessonCommonActions = [
    LessonCommonActionsEnum.LESSON_LESSON_END,
    LessonCommonActionsEnum.LESSON_LESSON_ENDING,
    LessonCommonActionsEnum.LESSON_LESSON_NOT_ENDING,
    LessonCommonActionsEnum.LESSON_LESSON_PAUSE,
    LessonCommonActionsEnum.LESSON_LESSON_RESET,
    LessonCommonActionsEnum.LESSON_LESSON_RESTART,
    LessonCommonActionsEnum.LESSON_LESSON_RESTORE_STATE,
    LessonCommonActionsEnum.LESSON_LESSON_START,
    LessonCommonActionsEnum.LESSON_LESSON_UNPAUSE,
];

const reducer: Reducer<ILessonState, TLessonActions> = ( state = INITIAL_STATE, action ) => {

    if ( lessonCommonActions.indexOf( action.type ) !== -1 ) {
        return {
            ...state,
            ...lessonCommonReducer( state, action )
        };
    } else {
        return {
            ...state,
            lessonComponent: lessonComponentReducer( state.lessonComponent, action ),
            // @ts-ignore
            lessonComparator: lessonComparatorReducer( state.lessonComparator, action ),
            lessonTextGenerator: lessonTextGeneratorReducer( state.lessonTextGenerator, action ),
            lessonButtons: lessonButtonsReducer( state.lessonButtons, action ),
            lessonStats: lessonStatsReducer( state.lessonStats, action ),
        };
    }
};


export { reducer as lessonReducer };

