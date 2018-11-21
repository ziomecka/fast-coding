import { Action, ActionCreator } from 'redux';
import { ComparatorTypes } from './types';

const {
    COMPONENTS_COMPARATOR_TURNON,
    COMPONENTS_COMPARATOR_REGISTER_NEW_KEY,
    COMPONENTS_COMPARATOR_REGISTER_ERROR,
    COMPONENTS_COMPARATOR_REGISTER_BACKSPACE,
    COMPONENTS_COMPARATOR_CORRECT_ERROR
} = ComparatorTypes;

export const registerNewKey: ActionCreator<RegisterNewKeyAction> = () => ({
    type: COMPONENTS_COMPARATOR_REGISTER_NEW_KEY
});

export const registerError: ActionCreator<RegisterErrorAction> = (allErrors: number[]) => ({
    type: COMPONENTS_COMPARATOR_REGISTER_ERROR,
    allErrors
});

export const correctError: ActionCreator<CorrectErrorAction> = (correctedErrors: number[]) => ({
    type: COMPONENTS_COMPARATOR_CORRECT_ERROR,
    correctedErrors
});

export const registerBackspace: ActionCreator<RegisterBackspaceAction> = () => ({
    type: COMPONENTS_COMPARATOR_REGISTER_BACKSPACE
});

export const turnOn: ActionCreator<TurnOnAction> = (turnedOn: boolean) => ({
    type: COMPONENTS_COMPARATOR_TURNON,
    turnedOn
});

export default {
    registerNewKey,
    registerError,
    registerBackspace,
    correctError,
    turnOn
};

export interface RegisterNewKeyAction extends Action {
    readonly type: string;
};

export interface RegisterErrorAction extends Action {
    readonly type: string;
    allErrors: number[];
};

export interface CorrectErrorAction extends Action {
    readonly type: string;
    correctedErrors: number[];
};

export interface RegisterBackspaceAction extends Action {
    readonly type: string;
};

export interface TurnOnAction extends Action {
    readonly type: string;
    turnedOn: boolean;
};

export type ComparatorActions = RegisterNewKeyAction |
    RegisterErrorAction |
    RegisterBackspaceAction |
    CorrectErrorAction |
    TurnOnAction;