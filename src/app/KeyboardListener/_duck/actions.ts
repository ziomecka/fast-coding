import { Action } from 'redux';
import {
    AddListener,
    RemoveAllListeners,
    RemoveListener,
} from './types';

export const actions = {};




export interface AddListenerAction extends RemoveListener, Action {}
export interface RemoveListenerAction extends RemoveListener, Action {}
export interface RemoveAllListenersAction extends RemoveAllListeners, Action {}

export type KeyboardListenerActions =
    AddListenerAction |
    RemoveListenerAction |
    RemoveAllListenersAction;
