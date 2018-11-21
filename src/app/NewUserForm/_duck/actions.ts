import { Action, ActionCreator } from 'redux';
import { NewUserFormTypes } from './types';

import { SetPasswordAction } from '../../Password/_duck/actions';
import { SetLoginAction } from '../../Login/_duck/actions';

const {
    APP_NEWUSERFORM_CREATE_NEWUSER
} = NewUserFormTypes;

export const createNewUser: ActionCreator<CreateNewUserAction> = () => ({
    type: APP_NEWUSERFORM_CREATE_NEWUSER,
});

export const actions = {
    createNewUser
};

export interface CreateNewUserAction extends Action {
    readonly type: string;
};

export type NewUserFormActions = CreateNewUserAction |
    SetPasswordAction |
    SetLoginAction;