import { Reducer } from 'redux';

import { NotificationTypes, NotificationVariantEnum } from './types';
import { NotificationActions, OpenNotificationAction } from './actions';

import { NOTIFICATION_DURATION } from '../../../constants';

const { success } = NotificationVariantEnum;

const {
    APP_NOTIFICATION_OPEN,
    APP_NOTIFICATION_CLOSE,
    APP_NOTIFICATION_RESET,
    APP_NOTIFICATION_SET_TIME
} = NotificationTypes;

export const INITIAL_STATE: NotificationState = {
    open: false,
    anchorEl: null,
    text: '',
    autoHideDuration: NOTIFICATION_DURATION,
    variant: success
};

const reducer: Reducer<NotificationState, NotificationActions> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case APP_NOTIFICATION_OPEN: {
            return {
                ...state,
                text: (action as OpenNotificationAction).text,
                open: true
            };
        }

        case APP_NOTIFICATION_CLOSE: {
            return {
                ...state,
                open: false
            };
        }

        case APP_NOTIFICATION_RESET: {
            return {
                ...state,
                text: '',
            };
        }

        case APP_NOTIFICATION_SET_TIME: {
            return {
                ...state,
                // @ts-ignore
                autoHideDuration: action.autoHideDuration
            };
        }

        default: {
            return { ...state };
        }
    }
}

export { reducer as notificationReducer };

export interface NotificationState {
    open: boolean;
    anchorEl: HTMLElement;
    text: string;
    autoHideDuration: number;
    variant: NotificationVariantEnum;
};