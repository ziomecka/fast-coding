import { Reducer } from 'redux';

import { LocationChangeActionsEnum } from './types';
import { LocationChangeActions } from './actions';

import { ApplicationState } from '@appStore';
import { ApplicationContainersEnum } from '@applicationTypes';

const { app } = ApplicationContainersEnum;

import { checkLocation } from './operations';

const {
   APP_LOCATION_CHANGE_CHANGE_LOCATION
} = LocationChangeActionsEnum;

const reducer: Reducer<ApplicationState, LocationChangeActions > = (state, action) => {
    switch (action.type) {
        /** Propagetes location, before it changes */
        case APP_LOCATION_CHANGE_CHANGE_LOCATION: {
            return {
                ...state,
                [app]: {
                    ...state[app],
                    [action.container]: {
                        ...state[app][action.container],
                        appLocation: checkLocation(action.pathname)
                    }
                }
            };
        }

        default: {
            return { ...state };
        }
    }
}

export { reducer as locationChangeReducer };