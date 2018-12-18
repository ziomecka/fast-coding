import { Action, ActionCreator } from 'redux';
import { WelcomeActionsEnum } from './types';
import { AppLocation } from '@appTypes';

const {
    APP_WELCOME_CHANGE_LOCATION
 } = WelcomeActionsEnum;


export const changeLocation: ActionCreator<ChangeLocationAction> = (appLocation: AppLocation) => ({
    type: APP_WELCOME_CHANGE_LOCATION,
    appLocation
});

export const actions = {
    changeLocation
};

export interface ChangeLocationAction extends Action {
    readonly type: string;
    appLocation: AppLocation;
};

export type WelcomeActions = ChangeLocationAction;