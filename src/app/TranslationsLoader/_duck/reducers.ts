import { Reducer } from 'redux';

import {
    GetTranslationsActionsEnum,
    TranslationsType
} from './types';

import { GetTranslationsActions } from './actions';

export const INITIAL_STATE: TranslationsLoaderState = {
    translations: null
};

const { APP_TRANSLATIONS_SAVE } = GetTranslationsActionsEnum;

const reducer: Reducer<TranslationsLoaderState, GetTranslationsActions> = ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
        case APP_TRANSLATIONS_SAVE: {
            return {
                ...state,
                translations: [ ...action.data ]
            };
        }

        default: {
            return { ...state };
        }
    }
};

export { reducer as translationsLoaderReducer };

export default INITIAL_STATE;

export interface TranslationsLoaderState {
   translations: TranslationsType[]
}