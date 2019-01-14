
import { ApplicationState } from '@appStore';
export { MediaEnum } from '@theme';
export enum ApplicationContainersEnum {
    views = 'views',
    components = 'components',
    app = 'app'
}

export type ThunkGetStateType = () => ApplicationState;

export enum LanguagesEnum {
    pl = 'pl',
    en = 'en'
}
