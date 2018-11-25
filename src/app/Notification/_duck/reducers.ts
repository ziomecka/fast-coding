import { Reducer } from 'redux';

import { NotificationTypes } from './types';
import { NotificationActions, OpenNotificationAction } from './actions';

const {
    APP_NOTIFICATION_OPEN,
    APP_NOTIFICATION_CLOSE,
    APP_NOTIFICATION_RESET
} = NotificationTypes;

export const INITIAL_STATE: NotificationState = {
    open: false,
    anchorEl: null,
    text: ''
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
};