import {
    RestoreStateAction as LessonComparatorRestoreStateAction,
    LessonComparatorState,
} from '@components/LessonComparator/';

import {
    localStorageGetItem,
    localStorageRemoveItem,
    localStorageSetItem,
} from '@app/LocalStorage/_duck/operations';

import { ComponentsContainersEnum } from '@componentsTypes';
import { Dispatch } from 'redux';
import { RestoreStateAction as LessonRestoreStateAction } from '../actions';
import { LessonState } from '../';
import { RestoreStateAction as LessonStatsRestoreStateAction } from '@components/LessonStats/';
import { LessonStatsState } from '@components/LessonStats';
import { LocalStorageItemEnum } from '@appTypes';
import { ThunkGetStateType } from '@applicationTypes';

export const onKeepState = ( localStorageItem: LocalStorageItemEnum, container: ComponentsContainersEnum ): any => (
    ( dispatch: Dispatch, getState: ThunkGetStateType ): boolean => localStorageSetItem( localStorageItem, getState().components[ container ] ) );

export const onRemoveState = ( localStorageItem: LocalStorageItemEnum ): any => (
    ( dispatch: Dispatch, getState: ThunkGetStateType ): boolean => localStorageRemoveItem( localStorageItem ) );

export const onRestoreState = (
    localStorageItem: LocalStorageItemEnum,
    action: ( data ) => LessonRestoreStateAction | LessonStatsRestoreStateAction | LessonComparatorRestoreStateAction,
    clearState: boolean = false
): any => (
    async ( dispatch: Dispatch ): Promise<boolean> => {
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
                data = null;
                answer = null;
                return true;
            }
        }

        return Promise.resolve( false );
    }
);

export default {
    onKeepState,
    onRestoreState,
    onRemoveState
};
