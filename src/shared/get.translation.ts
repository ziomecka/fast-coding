import { getTranslations, getLanguages, getActiveLanguage, LocalizeState } from 'react-localize-redux';

const getTranslation = (localize: LocalizeState, id: string): string => {
    try {
        return getTranslations(localize)[id][
            getLanguages(localize)
            .findIndex(lang => (
                lang.code === getActiveLanguage(localize).code)
            )
        ]
    } catch (err) {
        return 'Missing translation';
    }
};

export default getTranslation;