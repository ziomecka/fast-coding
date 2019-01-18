import {
    LessonComparatorState,
} from '@components/LessonComparator/';

import {
    localStorageGetItem,
    localStorageRemoveItem,
    localStorageSetItem,
} from '@app/LocalStorage/_duck/operations';

import { Dispatch } from 'redux';
import { IKeepStateOptions, IRestoreStateOptions } from '../types';
import { LessonState } from '../';
import { LessonStatsState } from '@components/LessonStats';
import { LocalStorageItemEnum } from '@appTypes';
import { ThunkGetStateType } from '@applicationTypes';

export const onKeepState = ( options: IKeepStateOptions ): any => ( dispatch: Dispatch, getState: ThunkGetStateType ): boolean => {
    const { localStorageItem, container } = options;
    return localStorageSetItem( localStorageItem, getState().components[ container ] );
};

export const onRemoveState = ( localStorageItem: LocalStorageItemEnum ): any => (
    (): boolean => localStorageRemoveItem( localStorageItem ) );

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
    onKeepState,
    onRestoreState,
    onRemoveState
};
