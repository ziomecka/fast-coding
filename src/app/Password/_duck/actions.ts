import { Action, ActionCreator } from 'redux';
import { PasswordTypes } from './types';

import { PasswordTypes as _PasswordTypes } from '../../_common/';
import { AppContainers } from '../../_common';

const { confirmPass, currentPass, newPass } = _PasswordTypes;

const {
    APP_PASSWORD_SET_PASSWORD_CURRENT,
    APP_PASSWORD_SET_PASSWORD_NEW,
    APP_PASSWORD_SET_PASSWORD_CONFIRM
} = PasswordTypes;

const setPasswordCurrent: ActionCreator<SetPasswordAction> = (password: string, container: AppContainers) => ({
    type: APP_PASSWORD_SET_PASSWORD_CURRENT,
    password,
    container
});

const setPasswordNew: ActionCreator<SetPasswordAction> = (password: string, container: AppContainers) => ({
    type: APP_PASSWORD_SET_PASSWORD_NEW,
    password,
    container
});

const setPasswordConfirm: ActionCreator<SetPasswordAction> = (password: string, container: AppContainers) => ({
    type: APP_PASSWORD_SET_PASSWORD_CONFIRM,
    password,
    container
});

const actionsMap = {
    [currentPass]: setPasswordCurrent,
    [newPass]: setPasswordNew,
    [confirmPass]: setPasswordConfirm
};

export const setPassword: ActionCreator<SetPasswordAction> = (password, passwordType: string, container: AppContainers) => (
    actionsMap[passwordType](password, container)
);

export const actions = {
    setPassword
};

export interface SetPasswordAction extends Action {
    readonly type: string;
    password: string;
    container: AppContainers;
};

export type PasswordActions = SetPasswordAction;