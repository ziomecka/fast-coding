import { Action, ActionCreator } from 'redux';
import {
    AddListener,
    KeyboardListenerActionsEnum,
    RemoveAllListeners,
    RemoveListener,
} from './types';

const {
    APP_KEYBOARD_LISTENER_ADD,
    APP_KEYBOARD_LISTENER_REMOVE,
    APP_KEYBOARD_LISTENER_REMOVE_ALL
} = KeyboardListenerActionsEnum;

export const addListener: ActionCreator<AddListenerAction> = ( options: AddListener ) => ( {
    type: APP_KEYBOARD_LISTENER_ADD,
    ...options
} );

export const removeListener: ActionCreator<RemoveListenerAction> = ( options: RemoveListener ) => ( {
    type: APP_KEYBOARD_LISTENER_REMOVE,
    ...options
} );

export const removeAllListeners: ActionCreator<RemoveAllListenersAction> = ( options: RemoveAllListeners ) => ( {
    type: APP_KEYBOARD_LISTENER_REMOVE_ALL,
    ...options
} );

export interface AddListenerAction extends AddListener, Action {}
export interface RemoveListenerAction extends RemoveListener, Action {}
export interface RemoveAllListenersAction extends RemoveAllListeners, Action {}

export type KeyboardListenerActions =
    AddListenerAction |
    RemoveListenerAction |
    RemoveAllListenersAction;
