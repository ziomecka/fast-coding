import { Reducer } from 'redux';

import { TextGeneratorActionsEnum } from './types';
import { TextGeneratorActions } from './actions';

const {
    COMPONENTS_TEXT_GENERATOR_TURNON,
    COMPONENTS_TEXT_GENERATOR_TURNOFF
} = TextGeneratorActionsEnum;

export const INITIAL_STATE: TextGeneratorState = {
    turnedOn: false
};

const reducer: Reducer<TextGeneratorState, TextGeneratorActions> = ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
        case COMPONENTS_TEXT_GENERATOR_TURNON: {
            return {
                ...state,
                turnedOn: true
            };
        }

        case COMPONENTS_TEXT_GENERATOR_TURNOFF: {
            return {
                ...state,
                turnedOn: false
            };
        }

        default: {
            return { ...state };
        }
    }
};

export { reducer as textGeneratorReducer };

export interface TextGeneratorData {
    turnedOn: boolean;
}

export interface TextGeneratorState extends TextGeneratorData {}