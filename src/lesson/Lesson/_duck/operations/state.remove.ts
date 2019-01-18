import { LocalStorageItemEnum, } from '@appTypes';
import { localStorageRemoveItem } from '@app/LocalStorage/_duck/operations';

export const onRemoveState = (): boolean => localStorageRemoveItem( LocalStorageItemEnum.lesson );

export default { onRemoveState };
