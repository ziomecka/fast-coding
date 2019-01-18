import {
    LessonComparatorState,
} from '@lesson/LessonComparator/';

import {
    localStorageGetItem,
} from '@app/LocalStorage/_duck/operations';

import { Dispatch } from 'redux';
import { IRestoreStateOptions } from '../types';
import { LessonState } from '../';
import { LessonStatsState } from '@lesson/LessonStats';

import { onRemoveState } from './state.remove';
export const onRestoreState = ( options: IRestoreStateOptions ): any => async ( dispatch: Dispatch ): Promise<boolean> => {
    let { localStorageItem, action, clearState = false } = options;

    let data = localStorageGetItem( localStorageItem );

    if ( data ) {
        let answer = await dispatch( action( data as LessonState | LessonStatsState | LessonComparatorState ) );

        /**
         * LessonComparator and lessonStats require clearing state
         * But it is done when new lesson is opened. Not here.
         * */
        if ( clearState ) {
            dispatch( onRemoveState( localStorageItem ) );
        }

        if ( answer ) {
            data = null; // GC
            answer = null; // GC
            action = null; // GC
            return true;
        }
    }

    return Promise.resolve( false );
};

export default {
    onRestoreState,
};
