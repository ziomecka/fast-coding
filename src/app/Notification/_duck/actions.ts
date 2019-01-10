import { Action, ActionCreator } from 'redux';
import { NotificationActionsEnum, NotificationVariantEnum } from './types';

const {
    APP_NOTIFICATION_CLOSE,
    APP_NOTIFICATION_OPEN,
    APP_NOTIFICATION_SET
} = NotificationActionsEnum;

export const openNotification: ActionCreator<Action> = () => ({
    type: APP_NOTIFICATION_OPEN
});

export const closeNotification: ActionCreator<Action> = () => ({
    type: APP_NOTIFICATION_CLOSE
});

export const setNotification: ActionCreator<SetNotificationAction & Action> = (options: SetNotificationAction) => ({
    type: APP_NOTIFICATION_SET,
    ...options
});

export const actions = {
    openNotification,
    closeNotification,
    setNotification
};

export interface SetNotificationAction {
    text: string;
    variant?: NotificationVariantEnum;
}

export type NotificationActions = Action & SetNotificationAction;
