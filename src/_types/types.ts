
import { ApplicationState } from '@appStore';
export { MediaEnum } from '@theme';

export enum ApplicationContainersEnum {
    app = 'app',
    courses = 'courses',
    lesson = 'lesson',
    views = 'views',
}

export type ThunkGetStateType = () => ApplicationState;

export enum LanguagesEnum {
    pl = 'pl',
    en = 'en'
}

export interface TextTranslationsI {
    // @ts-ignore
    [language: LanguagesEnum]: string
}
