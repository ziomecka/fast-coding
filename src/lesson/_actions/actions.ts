import { Action, ActionCreator } from 'redux';
import {
    LessonCommonActionsEnum,
    ILessonState,
} from '../_types';

import { restoreState as lessonComparatorRestoreState } from '@lesson/LessonComparator/';
import { restoreState as lessonStatsRestoreState } from '@lesson/LessonStats/';

const {
    LESSON_LESSON_START,
    LESSON_LESSON_PAUSE,
    LESSON_LESSON_UNPAUSE,
    LESSON_LESSON_ENDING,
    LESSON_LESSON_NOT_ENDING,
    LESSON_LESSON_END,
    LESSON_LESSON_RESET,
    LESSON_LESSON_RESTART,
    LESSON_LESSON_RESTORE_STATE
} = LessonCommonActionsEnum;


export const startLesson: ActionCreator<Action> = () => ( {
    type: LESSON_LESSON_START
} );

export const endingLesson: ActionCreator<Action> = () => ( {
    type: LESSON_LESSON_ENDING
} );

export const notEndingLesson: ActionCreator<Action> = () => ( {
    type: LESSON_LESSON_NOT_ENDING
} );

export const endLesson: ActionCreator<Action> = () => ( {
    type: LESSON_LESSON_END
} );

export const resetLesson: ActionCreator<Action> = () => ( {
    type: LESSON_LESSON_RESET
} );

export const restartLesson: ActionCreator<Action> = () => ( {
    type: LESSON_LESSON_RESTART
} );

export const pauseLesson: ActionCreator<Action> = () => ( {
    type: LESSON_LESSON_PAUSE
} );

export const unpauseLesson: ActionCreator<Action> = () => ( {
    type: LESSON_LESSON_UNPAUSE
} );


export const lessonRestoreState: ActionCreator<RestoreStateAction> = ( state: ILessonState ) => ( {
    type: LESSON_LESSON_RESTORE_STATE,
    state
} );

export const restoreState = {
    lesson: lessonRestoreState,
    lessonComparator: lessonComparatorRestoreState,
    lessonStats: lessonStatsRestoreState,
};

export default {
    endLesson,
    resetLesson
};

export interface RestoreStateAction extends Action {
    readonly type: string;
    state: ILessonState;
}

export type LessonCommonActions =
Action |
RestoreStateAction;
