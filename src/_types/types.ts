
import { ApplicationState } from '@src/_reducers/';
export { MediaEnum } from '../theme/types/';
export enum ApplicationContainersEnum {
    views = 'VIEWS',
    components = 'COMPONENTS',
    app = 'APP'
};

export type ThunkGetStateType =  () => ApplicationState ;

export enum LanguagesEnum {
    pl = 'pl',
    en = 'en'
};