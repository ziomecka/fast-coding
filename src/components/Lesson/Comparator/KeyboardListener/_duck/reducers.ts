import { Action, Reducer } from 'redux';
import { KeyboardListenerTypes } from './types';

const {
    COMPONENTS_KEYBOARD_LISTENER_RESET,
    COMPONENTS_KEYBOARD_LISTENER_TURN_OFF
} = KeyboardListenerTypes;

export const INITIAL_STATE: KeyboardListenerState = {
    turnedOn: true
};

const reducer: Reducer<KeyboardListenerState, Action> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case COMPONENTS_KEYBOARD_LISTENER_RESET: {
            return {
                turnedOn: true
            };
        }

        case COMPONENTS_KEYBOARD_LISTENER_TURN_OFF: {
            return {
                turnedOn: false
            };
        }

        default: {
            return { ...state };
        }
    }
};

export { reducer as keyboardListenerReducer };

export interface KeyboardListenerState {
    turnedOn: boolean;
};