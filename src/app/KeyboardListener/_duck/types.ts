import { AppContainers, ComponentsContainers, ViewsContainers, MenuContainers } from '../../../_common/';

export enum KeyboardListenerTypes {
    APP_KEYBOARD_LISTENER_ADD = '@@app_keyboardListener/ADD',
    APP_KEYBOARD_LISTENER_REMOVE = '@@app_keyboardListener/REMOVE',
    APP_KEYBOARD_LISTENER_REMOVE_ALL = '@@app_keyboardListener/REMOVE_ALL'
}

export type KeyboardListenerContainersType =
    ComponentsContainers.lesson |
    ViewsContainers.homeView |
    AppContainers.dialog |
    AppContainers.welcome |
    MenuContainers.languagesMenu |
    MenuContainers.mainMenu |
    MenuContainers.userMenu;

export type ListenerType = [ string, EventListener ];

export type KeyboardListenerContainerListenersType = Map< number, ListenerType >;

export type KeyboardListenerListenersType =
    Map< KeyboardListenerContainersType, KeyboardListenerContainerListenersType >;