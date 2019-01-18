import { Action, ActionCreator } from 'redux';
import { LessonTextGeneratorActionsEnum } from './types';

const {
    LESSON_LESSON_TEXT_GENERATOR_TURNON,
    LESSON_LESSON_TEXT_GENERATOR_TURNOFF
} = LessonTextGeneratorActionsEnum;

export const turnOnLessonTextGenerator: ActionCreator<TurnOnOffLessonTextGeneratorAction> = () => ( {
    type: LESSON_LESSON_TEXT_GENERATOR_TURNON
} );

export const turnOffLessonTextGenerator: ActionCreator<TurnOnOffLessonTextGeneratorAction> = () => ( {
    type: LESSON_LESSON_TEXT_GENERATOR_TURNOFF
} );

export interface TurnOnOffLessonTextGeneratorAction extends Action {
    readonly type: string;
}

export type LessonTextGeneratorActions = TurnOnOffLessonTextGeneratorAction;
