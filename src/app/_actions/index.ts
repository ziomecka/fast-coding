import { actions as dialogActions, DialogActions } from '../Dialog/_duck/actions';
import { actions as newUserFormActions, NewUserFormActions } from '../NewUserForm/_duck/actions';
import { actions as notificationActions, NotificationActions } from '../Notification/_duck/actions';
import { actions as passwordActions, PasswordActions } from '../Password/_duck/actions';
import { actions as loginActions, LoginActions } from '../Login/_duck/actions';

export const actions = {
    ...dialogActions,
    ...newUserFormActions,
    ...notificationActions,
    ...passwordActions,
    ...loginActions
};

export type AppActions = DialogActions |
    NewUserFormActions |
    NotificationActions |
    PasswordActions |
    LoginActions;