import { Action, ActionCreator } from 'redux';
import {
    LessonActionsEnum,
    LessonData,
    LessonState
} from './types';

import { LanguagesEnum } from '@applicationTypes';

import { restoreState as lessonComparatorRestoreState } from '@lesson/LessonComparator/';
import { restoreState as lessonStatsRestoreState } from '@lesson/LessonStats/';

const {
    LESSON_LESSON_OPEN,
    LESSON_LESSON_TEXT_UPDATE,
    LESSON_LESSON_UPDATE, // TODO?
    LESSON_LESSON_START,
    LESSON_LESSON_PAUSE,
    LESSON_LESSON_UNPAUSE,
    LESSON_LESSON_ENDING,
    LESSON_LESSON_NOT_ENDING,
    LESSON_LESSON_END,
    LESSON_LESSON_RESET,
    LESSON_LESSON_OPEN_DEMO,
    LESSON_LESSON_RESTART,
    LESSON_LESSON_RESTORE_STATE
} = LessonActionsEnum;

export const openLesson: ActionCreator<OpenLessonAction> = ( lessonData: LessonData ) => ( {
    type: LESSON_LESSON_OPEN,
    lessonData
} );

export const updateText: ActionCreator<UpdateTextAction> = ( text: string ) => ( {
    type: LESSON_LESSON_TEXT_UPDATE,
    text
} );

// TODO sa dwie takie same akcje, remove one
export const updateLesson: ActionCreator<OpenLessonAction> = ( lessonData: LessonData ) => ( {
    type: LESSON_LESSON_OPEN,
    lessonData
} );

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

export const openDemoLesson: ActionCreator<OpenDemoLessonAction> = ( language: LanguagesEnum ) => ( {
    type: LESSON_LESSON_OPEN_DEMO,
    language
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

export const lessonRestoreState: ActionCreator<RestoreStateAction> = ( state: LessonState ) => ( {
    type: LESSON_LESSON_RESTORE_STATE,
    state
} );

export const restoreState = {
    lesson: lessonRestoreState,
    lessonComparator: lessonComparatorRestoreState,
    lessonStats: lessonStatsRestoreState
};

/**
 * Actions that require keeping the state in localStorage
 * Used in Lesson global reducer
*/
export const stateKeepActions = [
    LessonActionsEnum.LESSON_LESSON_END,
    LessonActionsEnum.LESSON_LESSON_ENDING,
    LessonActionsEnum.LESSON_LESSON_NOT_ENDING,
    LessonActionsEnum.LESSON_LESSON_OPEN,
    LessonActionsEnum.LESSON_LESSON_OPEN_DEMO,
    LessonActionsEnum.LESSON_LESSON_PAUSE,
    LessonActionsEnum.LESSON_LESSON_RESET,
    LessonActionsEnum.LESSON_LESSON_RESTART,
    // LessonActionsEnum.LESSON_LESSON_RESTORE_STATE,
    LessonActionsEnum.LESSON_LESSON_START,
    LessonActionsEnum.LESSON_LESSON_TEXT_UPDATE,
    LessonActionsEnum.LESSON_LESSON_UNPAUSE,
    LessonActionsEnum.LESSON_LESSON_UPDATE
];

export default {
    endLesson,
    resetLesson
};

export interface OpenLessonAction extends Action {
    readonly type: string;
    lessonData: LessonData;
}

export interface UpdateTextAction extends Action {
    readonly type: string;
    text: string;
}

export interface OpenDemoLessonAction extends Action {
    readonly type: string;
    language: LanguagesEnum;
}

export interface RestoreStateAction extends Action {
    readonly type: string;
    state: LessonState;
}

export type LessonActions = Action |
    OpenLessonAction |
    UpdateTextAction |
    OpenDemoLessonAction;
