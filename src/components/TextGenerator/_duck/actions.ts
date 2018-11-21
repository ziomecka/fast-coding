import { Action, ActionCreator } from 'redux';
import { TextGeneratorTypes } from './types';

const {
    COMPONENTS_TEXT_GENERATOR_TURNON,
    COMPONENTS_TEXT_GENERATOR_TURNOFF
} = TextGeneratorTypes;

export const turnOnTextGenerator: ActionCreator<TurnOnOffTextGeneratorAction> = () => ({
    type: COMPONENTS_TEXT_GENERATOR_TURNON
});

export const turnOffTextGenerator: ActionCreator<TurnOnOffTextGeneratorAction> = () => ({
    type: COMPONENTS_TEXT_GENERATOR_TURNOFF
});

export interface TurnOnOffTextGeneratorAction extends Action {
    readonly type: string;
};

export type TextGeneratorActions = TurnOnOffTextGeneratorAction;