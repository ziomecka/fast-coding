import {
    localStorageSetItem,
} from '@app/LocalStorage/_duck/operations';

import { Dispatch } from 'redux';
import { IKeepStateOptions } from '../types';
import { ThunkGetStateType } from '@applicationTypes';

export const onKeepState = ( options: IKeepStateOptions ): any => ( dispatch: Dispatch, getState: ThunkGetStateType ): boolean => {
    const { localStorageItem, container } = options;
    return localStorageSetItem( localStorageItem, getState().lesson[ container ] );
};

export default {
    onKeepState
};
