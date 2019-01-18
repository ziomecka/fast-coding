import {
    localStorageRemoveItem,
} from '@app/LocalStorage/_duck/operations';

import { LocalStorageItemEnum } from '@appTypes';

export const onRemoveState = ( localStorageItem: LocalStorageItemEnum ): any => (
    (): boolean => localStorageRemoveItem( localStorageItem ) );

export default {
    onRemoveState
};
