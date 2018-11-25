import { Action, ActionCreator } from 'redux';
import { LessonButtonsTypes } from './types';

const {
    COMPONENTS_LESSON_BUTTONS_MOVE
} = LessonButtonsTypes;

export const moveLessonButtons: ActionCreator<MoveLessonButtonsAction> = (top, left) => ({
    type: COMPONENTS_LESSON_BUTTONS_MOVE,
    top,
    left
});

export interface MoveLessonButtonsAction extends Action {
    readonly type: string;
    top: number | 'auto';
    left: number | 'auto';
};

export type LessonButtonsActions = MoveLessonButtonsAction;