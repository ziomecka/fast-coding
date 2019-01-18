import { Action, ActionCreator } from 'redux';
import { LessonTextGeneratorActionsEnum } from './types';

const {
    COMPONENTS_LESSON_TEXT_GENERATOR_TURNON,
    COMPONENTS_LESSON_TEXT_GENERATOR_TURNOFF
} = LessonTextGeneratorActionsEnum;

export const turnOnLessonTextGenerator: ActionCreator<TurnOnOffLessonTextGeneratorAction> = () => ( {
    type: COMPONENTS_LESSON_TEXT_GENERATOR_TURNON
} );

export const turnOffLessonTextGenerator: ActionCreator<TurnOnOffLessonTextGeneratorAction> = () => ( {
    type: COMPONENTS_LESSON_TEXT_GENERATOR_TURNOFF
} );

export interface TurnOnOffLessonTextGeneratorAction extends Action {
    readonly type: string;
}

export type LessonTextGeneratorActions = TurnOnOffLessonTextGeneratorAction;
