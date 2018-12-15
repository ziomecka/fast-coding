import { Dispatch } from 'redux';
import { closeNotification, OpenNotificationAction } from '../app/Notification/_duck/actions';
import { onOpenNotification } from '../app/Notification/_duck/operations';

export const mapDispatchToProps = (dispatch: Dispatch): NotificationDispatch => ({
    openNotification: options => dispatch(onOpenNotification(options)),
    closeNotification: () => dispatch(closeNotification())
});

export interface NotificationDispatch {
    openNotification: (options: OpenNotificationAction) => void;
    closeNotification: () => void;
};