import { Dispatch, Action } from 'redux';
import { closeNotification, SetNotificationAction } from '../app/Notification/_duck/actions';
import { onOpenNotification } from '../app/Notification/_duck/operations';

export const mapDispatchToProps = (dispatch: Dispatch): NotificationDispatch => ({
    openNotification: options => dispatch(onOpenNotification(options)),
    closeNotification: () => dispatch(closeNotification())
});

export interface NotificationDispatch {
    openNotification: (options: SetNotificationAction) => SetNotificationAction & Action;
    closeNotification: () => Action;
};