import { Reducer } from 'redux';

import {
    LessonCommonActions,
    RestoreStateAction
} from '../_actions/';

import {
    LessonCommonActionsEnum,
    ILessonCommonState,
    ILessonState
} from '../_types/';

import { INITIAL_STATE as LESSON_BUTTONS_INITIAL_STATE } from '@lesson/LessonButtons/_duck/reducers';
import { INITIAL_STATE as LESSON_COMPARATOR_INITIAL_STATE } from '@lesson/LessonComparator/_duck/reducers';
import { INITIAL_STATE as LESSON_COMPONENT_INITIAL_STATE } from '@lesson/LessonComponent/_duck/reducers';
import { INITIAL_STATE as LESSON_INITIAL_STATE } from './';
import { INITIAL_STATE as LESSON_TEXT_GENERATOR_INITIAL_STATE } from '@lesson/LessonTextGenerator/_duck/reducers';
import { INITIAL_STATE as LESSON_STATS_INITIAL_STATE } from '@lesson/LessonStats/_duck/reducers';

const {
    LESSON_LESSON_END,
    LESSON_LESSON_ENDING,
    LESSON_LESSON_NOT_ENDING,
    LESSON_LESSON_PAUSE,
    LESSON_LESSON_RESET,
    LESSON_LESSON_RESTART,
    LESSON_LESSON_RESTORE_STATE,
    LESSON_LESSON_START,
    LESSON_LESSON_UNPAUSE
} = LessonCommonActionsEnum;

export const LESSON_COMMON_INITIAL_STATE: ILessonCommonState = {
    started: false,
    paused: false,
    ended: false,
    ending: false
};

const reducer: Reducer<ILessonState, LessonCommonActions> = ( state = LESSON_INITIAL_STATE, action ) => {
    switch ( action.type ) {
        case LESSON_LESSON_RESTART: {
            return {
                ...state,
                started: false,
                ended: false,
                ending: false
            };
        }

        case LESSON_LESSON_START: {
            return {
                ...state,
                started: true
            };
        }

        case LESSON_LESSON_ENDING: {
            return {
                ...state,
                ended: false,
                ending: true
            };
        }

        case LESSON_LESSON_NOT_ENDING: {
            return {
                ...state,
                ending: false,
            };
        }

        case LESSON_LESSON_END: {
            return {
                ...state,
                ending: false,
                ended: true
            };
        }

        case LESSON_LESSON_PAUSE: {
            return {
                ...state,
                paused: true
            };
        }

        case LESSON_LESSON_UNPAUSE: {
            return {
                ...state,
                paused: false
            };
        }

        case LESSON_LESSON_RESET: {
            return {
                lessonButtons: { ...LESSON_BUTTONS_INITIAL_STATE },
                lessonComparator: { ...LESSON_COMPARATOR_INITIAL_STATE },
                lessonComponent: { ...LESSON_COMPONENT_INITIAL_STATE },
                lessonStats: { ...LESSON_STATS_INITIAL_STATE },
                lessonTextGenerator: { ...LESSON_TEXT_GENERATOR_INITIAL_STATE },
                ...LESSON_COMMON_INITIAL_STATE,
            };
        }

        case LESSON_LESSON_RESTORE_STATE: {
            return {
                ...( action as RestoreStateAction ).state,
                lessonButtons: { ...( action as RestoreStateAction ).state.lessonButtons },
                lessonComparator: { ...( action as RestoreStateAction ).state.lessonComparator },
                lessonComponent: { ...( action as RestoreStateAction ).state.lessonComponent },
                lessonStats: { ...( action as RestoreStateAction ).state.lessonStats },
                lessonTextGenerator: { ...( action as RestoreStateAction ).state.lessonTextGenerator },
            };
        }

        default: {
            return { ...state };
        }
    }
};

export { reducer as lessonCommonReducer };


