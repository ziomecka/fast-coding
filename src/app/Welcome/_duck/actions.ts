import { Action, ActionCreator } from 'redux';
import { WelcomeTypes } from './types';
import { AppLocation } from '../../_common/';

const {
    APP_WELCOME_CHANGE_LOCATION
 } = WelcomeTypes;


export const changeLocation: ActionCreator<ChangeLocationAction> = (appLocation: AppLocation) => ({
    type: APP_WELCOME_CHANGE_LOCATION,
    appLocation
});

export interface ChangeLocationAction extends Action {
    readonly type: string;
    appLocation: AppLocation;
};

export type WelcomeActions = Action | ChangeLocationAction;