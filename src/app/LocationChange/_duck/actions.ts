import { Action, ActionCreator } from 'redux';
import { LocationChangeTypes } from './types';
import { AppLocation } from '../../_common/';

const {
   APP_LOCATION_CHANGE_CHANGE_LOCATION
 } = LocationChangeTypes;


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