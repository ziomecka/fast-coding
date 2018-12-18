import { Dispatch } from 'redux';
import { ThunkGetStateType, AppContainersEnum, ApplicationContainers } from '@applicationTypes';

const { app } = ApplicationContainers;
const { keyboardListener } = AppContainersEnum;

import {
    AddListener, RemoveListener, RemoveAllListeners
} from './actions';

import { KeyboardListenerContainerListenersType, ListenerType } from './types';

const addKeyDownListener = (listeners: KeyboardListenerContainerListenersType, listener: ListenerType): number => {
    document.addEventListener(listener[0], listener[1]);
    let i = listeners.size;
    listeners.set(++i, listener);
    return i;
};

const removeKeyDownListener = (listeners: KeyboardListenerContainerListenersType, listenerId: number): boolean => {
    try {
        let listener = listeners.get(listenerId);
        document.removeEventListener(listener[0], listener[1]);
        listener = null; // GC
        return listeners.delete(listenerId);
    } catch (err) {
        return false;
    }
};

const removeAllKeyDownListeners = (listeners: KeyboardListenerContainerListenersType): boolean => {
    if (listeners.size) {
        listeners.forEach(listener => document.removeEventListener(listener[0], listener[1]));
        listeners.clear();
    }
    return true;
};

export const onAddListener = ( options: AddListener ): any => (
    ( dispatch: Dispatch, getState: ThunkGetStateType ) => {
        const { container } = options;
        return addKeyDownListener(getState()[app][keyboardListener].listeners.get(container), options.listener);
    }
);

export const onRemoveListener = ( options: RemoveListener ): any => (
    ( dispatch: Dispatch, getState: ThunkGetStateType ): boolean => {
        const { container, listenerId } = options;
        return removeKeyDownListener(getState()[app][keyboardListener].listeners.get(container), listenerId);
    }
);

export const onRemoveAllListeners = ( options: RemoveAllListeners ): any => (
    ( dispatch: Dispatch, getState: ThunkGetStateType ): boolean => {
        const { container } = options;
        return removeAllKeyDownListeners(getState()[app][keyboardListener].listeners.get(container));
    }
);

export default {
    onAddListener,
    onRemoveListener,
    onRemoveAllListeners
};