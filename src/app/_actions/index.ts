import { Action } from 'redux';

import { actions as dialogActions, DialogActions } from '../Dialog/_duck/actions';
import { actions as newUserFormActions, NewUserFormActions } from '@forms/NewUserForm/_duck/actions';
import { actions as notificationActions, NotificationActions } from '@app/Notification/_duck/actions';
import { actions as passwordActions, PasswordActions } from '@forms/Password/_duck/actions';
import { actions as formHelperTextActions, FormHelperTextActions } from '@forms/FormHelperText/_duck/actions';
import { actions as welcomeActions, WelcomeActions } from '../Welcome/_duck/actions';
import { actions as menuListActions, MenuListActions } from '../MenuList/_duck/actions';
import { actions as appmenuActions, AppMenuActions } from '../AppMenu/_duck/actions';

export const actions = {
    ...dialogActions,
    ...newUserFormActions,
    ...notificationActions,
    ...passwordActions,
    ...formHelperTextActions,
    ...welcomeActions,
    ...menuListActions,
    ...appmenuActions
};

export type AppActions = Action |
    DialogActions |
    NewUserFormActions |
    NotificationActions |
    PasswordActions |
    FormHelperTextActions |
    WelcomeActions |
    MenuListActions |
    AppMenuActions;
