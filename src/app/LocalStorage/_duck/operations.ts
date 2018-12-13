import { LocalStorageDataTypes } from './types';
import { LocalStorageItemTypes } from '../../_common/';

export const localStorageGetItem = (name: LocalStorageItemTypes): any => (
    JSON.parse( localStorage.getItem(name) || null )
);

export const localStorageSetItem = (name: LocalStorageItemTypes, data: LocalStorageDataTypes): boolean => {
    localStorage.setItem(name, JSON.stringify(data));
    return true;
};

export const localStorageRemoveItem = (name: LocalStorageItemTypes): boolean => {
    localStorage.removeItem(name);
    return true;
};