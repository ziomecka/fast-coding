import { Action, ActionCreator } from 'redux';
import { LessonActionsEnum } from './types';

import { LessonData, LessonState } from './reducers';
import { LanguagesEnum } from '@applicationTypes';

const {
    COMPONENTS_LESSON_OPEN,
    COMPONENTS_LESSON_TEXT_UPDATE,
    COMPONENTS_LESSON_UPDATE, // TODO?
    COMPONENTS_LESSON_START,
    COMPONENTS_LESSON_PAUSE,
    COMPONENTS_LESSON_UNPAUSE,
    COMPONENTS_LESSON_ENDING,
    COMPONENTS_LESSON_NOT_ENDING,
    COMPONENTS_LESSON_END,
    COMPONENTS_LESSON_RESET,
    COMPONENTS_LESSON_OPEN_DEMO,
    COMPONENTS_LESSON_RESTART,
    COMPONENTS_LESSON_RESTORE_STATE
} = LessonActionsEnum;

export const openLesson: ActionCreator<OpenLessonAction> = (lessonData: LessonData) => ({
    type: COMPONENTS_LESSON_OPEN,
    lessonData
});

export const updateText: ActionCreator<UpdateTextAction> = (text: string) => ({
    type: COMPONENTS_LESSON_TEXT_UPDATE,
    text
});

// TODO sa dwie takie same akcje, remove one
export const updateLesson: ActionCreator<OpenLessonAction> = (lessonData: LessonData) => ({
    type: COMPONENTS_LESSON_OPEN,
    lessonData
});

export const startLesson: ActionCreator<Action> = () => ({
    type: COMPONENTS_LESSON_START
});

export const endingLesson: ActionCreator<Action> = () => ({
    type: COMPONENTS_LESSON_ENDING
});

export const notEndingLesson: ActionCreator<Action> = () => ({
    type: COMPONENTS_LESSON_NOT_ENDING
});

export const endLesson: ActionCreator<Action> = () => ({
    type: COMPONENTS_LESSON_END
});

export const resetLesson: ActionCreator<Action> = () => ({
    type: COMPONENTS_LESSON_RESET
});

export const openDemoLesson: ActionCreator<OpenDemoLessonAction> = (language: LanguagesEnum) => ({
    type: COMPONENTS_LESSON_OPEN_DEMO,
    language
});

export const restartLesson: ActionCreator<Action> = () => ({
    type: COMPONENTS_LESSON_RESTART
});

export const pauseLesson: ActionCreator<Action> = () => ({
    type: COMPONENTS_LESSON_PAUSE
});

export const unpauseLesson: ActionCreator<Action> = () => ({
    type: COMPONENTS_LESSON_UNPAUSE
});

export const restoreState: ActionCreator<RestoreStateAction> = (state: LessonState) => ({
    type: COMPONENTS_LESSON_RESTORE_STATE,
    state
});

export default {
    endLesson,
    resetLesson
};

export interface OpenLessonAction extends Action {
    readonly type: string;
    lessonData: LessonData;
};

export interface UpdateTextAction extends Action {
    readonly type: string;
    text: string;
};

export interface OpenDemoLessonAction extends Action {
    readonly type: string;
    language: LanguagesEnum;
};

export interface RestoreStateAction extends Action {
    readonly type: string;
    state: LessonState;
};

export type LessonActions = Action |
    OpenLessonAction |
    UpdateTextAction |
    OpenDemoLessonAction;