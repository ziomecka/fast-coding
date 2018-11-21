import { Reducer } from 'redux';

import { classTitleHome, classTitleFalling } from './operations';
import { WelcomeActions } from './actions';

import { AppLocation } from '../../_common/';
import { WelcomeTypes } from './types';

import { getClasses } from './operations';

const { APP_WELCOME_CHANGE_LOCATION } = WelcomeTypes;

export const INITIAL_STATE: WelcomeState = {
    appLocation: AppLocation.isHome,
    classTitle: classTitleHome,
    classAnimated: classTitleFalling,
};

const reducer: Reducer<WelcomeState, WelcomeActions > = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case APP_WELCOME_CHANGE_LOCATION: {
            return {
                ...state,
                ...getClasses(action.appLocation)
            };
        }

        default: {
            return { ...state };
        }
    }
}

export { reducer as welcomeReducer };

/**
 * @param classAnimated - class for falling letters
 * @param classTitle - class for title height
 */
export interface WelcomeClasses {
    classAnimated: string;
    classTitle: string;
};

export interface WelcomeState extends WelcomeClasses {
    appLocation: AppLocation;
};