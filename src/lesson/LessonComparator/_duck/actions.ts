import { Action, ActionCreator } from 'redux';
import { LessonComparatorActionsEnum } from './types';

const {
    LESSON_LESSON_COMPARATOR_REGISTER_NEW_KEY,
    LESSON_LESSON_COMPARATOR_REGISTER_ERROR,
    LESSON_LESSON_COMPARATOR_REGISTER_BACKSPACE,
    LESSON_LESSON_COMPARATOR_CORRECT_ERROR,
    LESSON_LESSON_COMPARATOR_RESET,
} = LessonComparatorActionsEnum;

export const registerNewKey: ActionCreator<RegisterNewKeyAction> = ( currentSignIndex: number ) => ( {
    type: LESSON_LESSON_COMPARATOR_REGISTER_NEW_KEY,
    currentSignIndex
} );

export const registerError: ActionCreator<RegisterErrorAction> = ( errors: number[], allErrors: number[], currentSignIndex: number ) => ( {
    type: LESSON_LESSON_COMPARATOR_REGISTER_ERROR,
    errors,
    allErrors,
    currentSignIndex
} );

export const correctError: ActionCreator<CorrectErrorAction> = ( correctedErrors: number[] ) => ( {
    type: LESSON_LESSON_COMPARATOR_CORRECT_ERROR,
    correctedErrors
} );

export const registerBackspace: ActionCreator<Action> = () => ( {
    type: LESSON_LESSON_COMPARATOR_REGISTER_BACKSPACE
} );

export const resetLessonComparator: ActionCreator<Action> = () => ( {
    type: LESSON_LESSON_COMPARATOR_RESET
} );

export default {
    registerNewKey,
    registerError,
    registerBackspace,
    correctError,
    resetLessonComparator
};

export interface RegisterNewKeyAction extends Action {
    readonly type: string;
    currentSignIndex: number;
}

export interface RegisterErrorAction extends Action {
    readonly type: string;
    errors: number[];
    allErrors: number[];
    currentSignIndex: number;
}

export interface CorrectErrorAction extends Action {
    readonly type: string;
    correctedErrors: number[];
}

export type LessonComparatorActions = RegisterNewKeyAction |
    RegisterErrorAction |
    CorrectErrorAction;
