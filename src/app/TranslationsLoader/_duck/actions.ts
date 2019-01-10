import { Action, ActionCreator } from 'redux';
import { GetTranslationsActionsEnum, TranslationsType } from './types';

const {
    APP_TRANSLATIONS_SAVE
} = GetTranslationsActionsEnum;

export const saveTranslations: ActionCreator<SaveTranslationsActionType> = (data: ISaveTranslations) => ({
    type: APP_TRANSLATIONS_SAVE,
    data
});

export const actions = {
    saveTranslations
};

export type ISaveTranslations = TranslationsType[];

export type SaveTranslationsActionType = Action & {
    data:  ISaveTranslations
};

export type GetTranslationsActions = SaveTranslationsActionType;