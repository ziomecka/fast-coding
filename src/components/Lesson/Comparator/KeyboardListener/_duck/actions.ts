import { Action, ActionCreator } from 'redux';
import { KeyboardListenerTypes } from './types';

const {
    COMPONENTS_KEYBOARD_LISTENER_BACKSPACE,
    COMPONENTS_KEYBOARD_LISTENER_KEY_DOWN
} = KeyboardListenerTypes;

export const handleKeyDown: ActionCreator<HandleKeyDownAction> = (sign: string) => ({
    type: COMPONENTS_KEYBOARD_LISTENER_KEY_DOWN,
    sign
});

export const handleBackspace: ActionCreator<HandleBackspaceAction> = () => ({
    type: COMPONENTS_KEYBOARD_LISTENER_BACKSPACE
});

export default {
    handleKeyDown,
    handleBackspace
};

export interface HandleKeyDownAction extends Action {
    readonly type: string;
    sign: string;
};

export interface HandleBackspaceAction extends Action {
    readonly type: string;
};

export type KeyboardListenerActions = HandleKeyDownAction;