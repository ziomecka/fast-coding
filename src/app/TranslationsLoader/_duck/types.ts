import { GetResponseI } from '@app/api/';

export enum GetTranslationsActionsEnum {
    APP_TRANSLATIONS_SAVE = '@@app_getTranslations/TRANSLATIONS_SAVE'
}

export interface TranslationsType {
    id: string;
    en: { [key: string]: string };
    pl: { [key: string]: string };
}

export interface GetTranslationsResponseI extends GetResponseI {
    translations: TranslationsType[]
}
