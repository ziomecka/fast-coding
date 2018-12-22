export enum NotificationActionsEnum {
    APP_NOTIFICATION_OPEN = '@@app_notification/OPEN',
    APP_NOTIFICATION_CLOSE = '@@app_notification/CLOSE',
    APP_NOTIFICATION_SET = '@@app_notification/SET'
};

export enum NotificationVariantEnum {
    success = 'SUCCESS',
    error = 'ERROR'
};

export enum NotificationDurationEnum {
    short = 3000,
    standard = 5000,
    long = 8000
};