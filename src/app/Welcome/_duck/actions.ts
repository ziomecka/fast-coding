import { Action, ActionCreator } from 'redux';
import { WelcomeActionsEnum } from './types';
import { AppLocationEnum } from '@appTypes';

const {
    APP_WELCOME_CHANGE_LOCATION
 } = WelcomeActionsEnum;


export const changeLocation: ActionCreator<ChangeLocationAction> = ( appLocation: AppLocationEnum ) => ( {
    type: APP_WELCOME_CHANGE_LOCATION,
    appLocation
} );

export const actions = {
    changeLocation
};

export interface ChangeLocationAction extends Action {
    readonly type: string;
    appLocation: AppLocationEnum;
}

export type WelcomeActions = ChangeLocationAction;
