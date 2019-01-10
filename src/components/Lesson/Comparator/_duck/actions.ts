import { Action, ActionCreator } from 'redux';
import { ComparatorActionsEnum } from './types';
import { ComparatorState } from './reducers';

const {
    COMPONENTS_COMPARATOR_REGISTER_NEW_KEY,
    COMPONENTS_COMPARATOR_REGISTER_ERROR,
    COMPONENTS_COMPARATOR_REGISTER_BACKSPACE,
    COMPONENTS_COMPARATOR_CORRECT_ERROR,
    COMPONENTS_COMPARATOR_RESET,
    COMPONENTS_COMPARATOR_RESTORE_STATE
} = ComparatorActionsEnum;

export const registerNewKey: ActionCreator<RegisterNewKeyAction> = ( currentSignIndex: number ) => ( {
    type: COMPONENTS_COMPARATOR_REGISTER_NEW_KEY,
    currentSignIndex
} );

export const registerError: ActionCreator<RegisterErrorAction> = ( errors: number[], allErrors: number[], currentSignIndex: number ) => ( {
    type: COMPONENTS_COMPARATOR_REGISTER_ERROR,
    errors,
    allErrors,
    currentSignIndex
} );

export const correctError: ActionCreator<CorrectErrorAction> = ( correctedErrors: number[] ) => ( {
    type: COMPONENTS_COMPARATOR_CORRECT_ERROR,
    correctedErrors
} );

export const registerBackspace: ActionCreator<Action> = () => ( {
    type: COMPONENTS_COMPARATOR_REGISTER_BACKSPACE
} );

export const resetComparator: ActionCreator<Action> = () => ( {
    type: COMPONENTS_COMPARATOR_RESET
} );

export const restoreState: ActionCreator<RestoreStateAction> = ( state: ComparatorState ) => ( {
    type: COMPONENTS_COMPARATOR_RESTORE_STATE,
    state
} );

export default {
    registerNewKey,
    registerError,
    registerBackspace,
    correctError,
    resetComparator
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
    state: ComparatorState;
}

export type ComparatorActions = RegisterNewKeyAction |
    RegisterErrorAction |
    CorrectErrorAction |
    RestoreStateAction;