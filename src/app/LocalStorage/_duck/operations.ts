import { LessonData } from '../../../components/Lesson/_duck/reducers';


export type LocalStorageDataTypes = LessonData[];

import { LocalStorageItemTypes } from '../../_common/';

export const localStorageGetItem = (name: LocalStorageItemTypes): any => (
    JSON.parse(localStorage.getItem(name))
);

export const localStorageSetItem = (name: LocalStorageItemTypes, data: LocalStorageDataTypes): boolean => {
    localStorage.setItem(name, JSON.stringify(data));
    return true;
};