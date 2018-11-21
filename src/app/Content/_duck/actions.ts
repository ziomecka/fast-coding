import { Action, ActionCreator } from 'redux';
import { ContentTypes } from './types';
import { AppLocation } from '../../_common/';

const {
    APP_CONTENT_CHANGE_LOCATION
 } = ContentTypes;


export const changeLocation: ActionCreator<ChangeLocationAction> = (appLocation: AppLocation) => ({
    type: APP_CONTENT_CHANGE_LOCATION,
    appLocation
});

export interface ChangeLocationAction extends Action {
    readonly type: string;
    appLocation: AppLocation;
};

export type ContentActions = ChangeLocationAction;