import { Action, ActionCreator } from 'redux';
import { KeyboardListenerTypes } from './types';

const {
    COMPONENTS_KEYBOARD_LISTENER_TURN_OFF,
    COMPONENTS_KEYBOARD_LISTENER_RESET
} = KeyboardListenerTypes;

export const turnOffKeyboardListener: ActionCreator<Action> = () => ({
    type: COMPONENTS_KEYBOARD_LISTENER_TURN_OFF
});

export const resetKeyboardListener: ActionCreator<Action> = () => ({
    type: COMPONENTS_KEYBOARD_LISTENER_RESET
});

export default {
    turnOffKeyboardListener,
    resetKeyboardListener
};