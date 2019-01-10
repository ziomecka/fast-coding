import { Action, ActionCreator } from 'redux';
import { TextGeneratorActionsEnum } from './types';

const {
    COMPONENTS_TEXT_GENERATOR_TURNON,
    COMPONENTS_TEXT_GENERATOR_TURNOFF
} = TextGeneratorActionsEnum;

export const turnOnTextGenerator: ActionCreator<TurnOnOffTextGeneratorAction> = () => ({
    type: COMPONENTS_TEXT_GENERATOR_TURNON
});

export const turnOffTextGenerator: ActionCreator<TurnOnOffTextGeneratorAction> = () => ({
    type: COMPONENTS_TEXT_GENERATOR_TURNOFF
});

export interface TurnOnOffTextGeneratorAction extends Action {
    readonly type: string;
}

export type TextGeneratorActions = TurnOnOffTextGeneratorAction;