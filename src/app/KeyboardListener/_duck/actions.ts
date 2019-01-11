import { Action } from 'redux';
import { KeyboardListenerContainersType, ListenerType } from './types';

export const actions = {};

export interface AddListener {
    container: KeyboardListenerContainersType;
    listener: ListenerType;
}

export interface RemoveListener {
    container: KeyboardListenerContainersType;
    listenerId: number;
}

export interface RemoveAllListeners {
    container: KeyboardListenerContainersType;
}

export interface AddListenerAction extends RemoveListener, Action {}
export interface RemoveListenerAction extends RemoveListener, Action {}
export interface RemoveAllListenersAction extends RemoveAllListeners, Action {}

export type KeyboardListenerActions =
    AddListenerAction |
    RemoveListenerAction |
    RemoveAllListenersAction;
