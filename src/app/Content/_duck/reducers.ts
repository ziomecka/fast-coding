import { Reducer } from 'redux';
import { AppLocation } from '@appTypes';
import { ContentTypes } from './types';
import { getClasses, contentClassHome } from './operations';

const {
    APP_CONTENT_CHANGE_LOCATION,
    APP_CONTENT_ONDROP_REGISTER,
    APP_CONTENT_ONDROP_DEREGISTER,
    APP_CONTENT_TITLE_CHANGE
} = ContentTypes;

export const INITIAL_STATE: ContentState = {
    contentClass: contentClassHome,
    appLocation: AppLocation.isHome,
    onDrop: [],
    title: ''
};

const reducer: Reducer<ContentState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case APP_CONTENT_CHANGE_LOCATION: {
            return {
                ...state,
                ...getClasses(action.appLocation),
            };
        }

        case APP_CONTENT_ONDROP_REGISTER: {
            return {
                ...state,
                onDrop: [...state.onDrop, action.onDrop]
            };
        }

        // TODO improve, GC
        case APP_CONTENT_ONDROP_DEREGISTER: {
            const index = state.onDrop.findIndex(item => item === action.onDrop);
            const temp = [...state.onDrop];
            temp.splice(index, 1);
            return {
                ...state,
                onDrop: [ ...temp ]
            };
        }

        case APP_CONTENT_TITLE_CHANGE: {
            return {
                ...state,
                title: action.title
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
    appLocation: AppLocation;
    onDrop: Array<(e: React.DragEvent<HTMLElement>)=> void>;
    title: string;
};