import { Action, ActionCreator } from 'redux';
import { RemindPasswordActionsEnum } from './types';

const {
    APP_REMIND_PASSWORD_SET_EMAIL,
    APP_REMIND_PASSWORD_RESET
} = RemindPasswordActionsEnum;


export const setEmail: ActionCreator<SetEmailAction> = ( options: SetEmail ) => ( {
    type: APP_REMIND_PASSWORD_SET_EMAIL,
    ...options
} );

export const reset: ActionCreator<Action> = () => ( {
    type: APP_REMIND_PASSWORD_RESET
} );

export const actions = {
    setEmail,
    reset
};

export interface SetEmail {
    email: string;
}

export interface SetEmailAction extends Action, SetEmail {}
export interface ResetAction extends Action {}

export type RemindPasswordActions = Action |
    SetEmailAction;
