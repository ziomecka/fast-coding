import { Action, ActionCreator } from 'redux';
import { NotificationTypes } from './types';

const {
    APP_NOTIFICATION_CLOSE,
    APP_NOTIFICATION_OPEN
} = NotificationTypes;


export const openNotification: ActionCreator<OpenNotificationAction> = (text: string, timeout?: number) => ({
    type: APP_NOTIFICATION_OPEN,
    timeout,
    text
});

export const closeNotification: ActionCreator<Action> = () => ({
    type: APP_NOTIFICATION_CLOSE
});

export const actions = {
    openNotification,
    closeNotification
};

export interface OpenNotificationAction extends Action {
    readonly type: string;
    timeout?: number;
    text: string;
};

export type NotificationActions = Action | OpenNotificationAction;