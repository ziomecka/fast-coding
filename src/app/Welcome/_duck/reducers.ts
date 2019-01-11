import { Reducer } from 'redux';

import { classTitleHome, classTitleFalling, getClasses } from './operations';
import { WelcomeActions } from './actions';

import { AppLocationEnum } from '@appTypes';
import { WelcomeActionsEnum } from './types';

const { APP_WELCOME_CHANGE_LOCATION } = WelcomeActionsEnum;

export const INITIAL_STATE: WelcomeState = {
    appLocation: AppLocationEnum.isHome,
    classTitle: classTitleHome,
    classAnimated: classTitleFalling,
};

const reducer: Reducer<WelcomeState, WelcomeActions > = ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
        case APP_WELCOME_CHANGE_LOCATION: {
            return {
                ...state,
                ...getClasses( action.appLocation )
            };
        }

        default: {
            return { ...state };
        }
    }
};

export { reducer as welcomeReducer };

/**
 * @param classAnimated - class for falling letters
 * @param classTitle - class for title height
 */
export interface WelcomeClasses {
    classAnimated: string;
    classTitle: string;
}

export interface WelcomeState extends WelcomeClasses {
    appLocation: AppLocationEnum;
}
