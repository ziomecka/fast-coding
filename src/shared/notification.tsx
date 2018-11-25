import { Dispatch } from 'redux';
import { closeNotification } from '../app/Notification/_duck/actions';
import { onOpenNotification } from '../app/Notification/_duck/operations';

export const mapDispatchToProps = (dispatch: Dispatch): NotificationDispatch => ({
    openNotification: (text: string, timeout: number) => dispatch(onOpenNotification(text, timeout)),
    closeNotification: () => dispatch(closeNotification())
});

export interface NotificationDispatch {
    openNotification: (text: string, timeout?: number) => void;
    closeNotification: () => void;
};