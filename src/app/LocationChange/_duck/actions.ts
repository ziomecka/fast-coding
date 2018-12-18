import { Action, ActionCreator } from 'redux';
import { LocationChangeActionsEnum } from './types';
import { AppLocation } from '@appTypes';

const {
   APP_LOCATION_CHANGE_CHANGE_LOCATION
 } = LocationChangeActionsEnum;


export const changeLocation: ActionCreator<ChangeLocationAction> =
    (pathname: AppLocation, container: string) => ({
        type: APP_LOCATION_CHANGE_CHANGE_LOCATION,
        pathname,
        container,
    });

export interface ChangeLocationAction extends Action {
    readonly type: string;
    pathname: string;
    container: string;
};

export type LocationChangeActions = ChangeLocationAction;