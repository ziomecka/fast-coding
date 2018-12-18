import { LocalStorageDataTypes } from './types';
import { LocalStorageItemEnum } from '@appTypes';

export const localStorageGetItem = (name: LocalStorageItemEnum): any => (
    JSON.parse( localStorage.getItem(name) || null )
);

export const localStorageSetItem = (name: LocalStorageItemEnum, data: LocalStorageDataTypes): boolean => {
    localStorage.setItem(name, JSON.stringify(data));
    return true;
};

export const localStorageRemoveItem = (name: LocalStorageItemEnum): boolean => {
    localStorage.removeItem(name);
    return true;
};