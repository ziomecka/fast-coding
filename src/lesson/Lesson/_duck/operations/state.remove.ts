import { LocalStorageItemEnum, } from '@appTypes';
import { localStorageRemoveItem } from '@app/LocalStorage/_duck/operations';

const { lesson } = LocalStorageItemEnum;

export const onRemoveState = (): boolean => localStorageRemoveItem( lesson );

export default { onRemoveState };
