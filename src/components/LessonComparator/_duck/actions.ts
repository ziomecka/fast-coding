import { Action, ActionCreator } from 'redux';
import { LessonComparatorActionsEnum } from './types';
import { LessonComparatorState } from './reducers';

const {
    COMPONENTS_LESSON_COMPARATOR_REGISTER_NEW_KEY,
    COMPONENTS_LESSON_COMPARATOR_REGISTER_ERROR,
    COMPONENTS_LESSON_COMPARATOR_REGISTER_BACKSPACE,
    COMPONENTS_LESSON_COMPARATOR_CORRECT_ERROR,
    COMPONENTS_LESSON_COMPARATOR_RESET,
    COMPONENTS_LESSON_COMPARATOR_RESTORE_STATE
} = LessonComparatorActionsEnum;

export const registerNewKey: ActionCreator<RegisterNewKeyAction> = ( currentSignIndex: number ) => ( {
    type: COMPONENTS_LESSON_COMPARATOR_REGISTER_NEW_KEY,
    currentSignIndex
} );

export const registerError: ActionCreator<RegisterErrorAction> = ( errors: number[], allErrors: number[], currentSignIndex: number ) => ( {
    type: COMPONENTS_LESSON_COMPARATOR_REGISTER_ERROR,
    errors,
    allErrors,
    currentSignIndex
} );

export const correctError: ActionCreator<CorrectErrorAction> = ( correctedErrors: number[] ) => ( {
    type: COMPONENTS_LESSON_COMPARATOR_CORRECT_ERROR,
    correctedErrors
} );

export const registerBackspace: ActionCreator<Action> = () => ( {
    type: COMPONENTS_LESSON_COMPARATOR_REGISTER_BACKSPACE
} );

export const resetLessonComparator: ActionCreator<Action> = () => ( {
    type: COMPONENTS_LESSON_COMPARATOR_RESET
} );

export const restoreState: ActionCreator<RestoreStateAction> = ( state: LessonComparatorState ) => ( {
    type: COMPONENTS_LESSON_COMPARATOR_RESTORE_STATE,
    state
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

export interface RestoreStateAction extends Action {
    readonly type: string;
    state: LessonComparatorState;
}

export type LessonComparatorActions = RegisterNewKeyAction |
    RegisterErrorAction |
    CorrectErrorAction |
    RestoreStateAction;
