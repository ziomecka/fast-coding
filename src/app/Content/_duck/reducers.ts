import { Reducer } from 'redux';
import { AppLocation } from '../../_common/';
import { ContentTypes } from './types';
import { getClasses, contentClassHome } from './operations';

const { APP_CONTENT_CHANGE_LOCATION } = ContentTypes;

export const INITIAL_STATE: ContentState = {
    contentClass: contentClassHome,
    appLocation: AppLocation.isHome
};

const reducer: Reducer<ContentState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case APP_CONTENT_CHANGE_LOCATION: {
            return {
                ...state,
                ...getClasses(action.appLocation),
            };
        }

        default: {
            return { ...state };
        }
    }
}

export { reducer as contentReducer };

export interface ContentClasses {
    contentClass: string;
};

export interface ContentState extends ContentClasses {
    appLocation: AppLocation
};