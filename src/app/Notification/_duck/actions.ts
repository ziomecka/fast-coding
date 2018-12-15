import { Action, ActionCreator } from 'redux';
import { NotificationTypes, NotificationVariantEnum } from './types';

const {
    APP_NOTIFICATION_CLOSE,
    APP_NOTIFICATION_OPEN,
<<<<<<< HEAD
    APP_NOTIFICATION_SET
=======
    APP_NOTIFICATION_RESET
>>>>>>> 63837d4... Notification operations onOpenNotification do not setTimeNotification. Not needed done in action
} = NotificationTypes;

export const openNotification: ActionCreator<Action> = () => ({
    type: APP_NOTIFICATION_OPEN
});

export const closeNotification: ActionCreator<Action> = () => ({
    type: APP_NOTIFICATION_CLOSE
});

<<<<<<< HEAD
export const setNotification: ActionCreator<SetNotificationAction & Action> = (options: SetNotificationAction) => ({
    type: APP_NOTIFICATION_SET,
    ...options
=======
export const resetNotification: ActionCreator<Action> = () => ({
    type: APP_NOTIFICATION_RESET
>>>>>>> 63837d4... Notification operations onOpenNotification do not setTimeNotification. Not needed done in action
});

export const actions = {
    openNotification,
    closeNotification,
<<<<<<< HEAD
    setNotification
=======
    resetNotification
>>>>>>> 63837d4... Notification operations onOpenNotification do not setTimeNotification. Not needed done in action
};

export interface SetNotificationAction {
    text: string;
    variant?: NotificationVariantEnum;
};

<<<<<<< HEAD
export type NotificationActions = Action & SetNotificationAction;
=======
export type NotificationActions = Action & OpenNotificationAction;
>>>>>>> 63837d4... Notification operations onOpenNotification do not setTimeNotification. Not needed done in action
