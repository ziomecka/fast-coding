import { GetResponseI } from '@app/api/';

export enum GetTranslationsActionsEnum {
    APP_TRANSLATIONS_SAVE = '@@app_getTranslations/TRANSLATIONS_SAVE'
}

export interface TranslationsType {
    [key: string]: string;
}

export interface GetTranslationsResponseI extends GetResponseI {
    translations: {
        en: TranslationsType,
        pl: TranslationsType
    }
};
