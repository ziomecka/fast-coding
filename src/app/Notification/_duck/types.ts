export enum NotificationTypes {
    APP_NOTIFICATION_OPEN = '@@app_notification/OPEN',
    APP_NOTIFICATION_CLOSE = '@@app_notification/CLOSE',
<<<<<<< HEAD
    APP_NOTIFICATION_SET = '@@app_notification/SET'
=======
    APP_NOTIFICATION_RESET = '@@app_notification/CLOSE'
>>>>>>> 63837d4... Notification operations onOpenNotification do not setTimeNotification. Not needed done in action
};

export enum NotificationVariantEnum {
    success = 'SUCCESS',
    error = 'ERROR'
};