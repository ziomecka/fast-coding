import { Action, Dispatch } from 'redux';
import {
    SetNotificationAction,
    closeNotification,
    openNotification,
} from '@app/Notification/';

export const mapDispatchToProps = (dispatch: Dispatch): NotificationDispatch => ({
    openNotification: options => dispatch(openNotification(options)),
    closeNotification: () => dispatch(closeNotification())
});

export interface NotificationDispatch {
    openNotification: (options: SetNotificationAction) => SetNotificationAction & Action;
    closeNotification: () => Action;
}