import { renderToStaticMarkup } from 'react-dom/server';
import { LocalizeState } from 'react-localize-redux';
import translations from './translations.json';

const languages = [
    { name: 'English', code: 'en', active: true },
    { name: 'Polish', code: 'pl', active: false }
];

export const INITIAL_STATE: LocalizeState = {
    languages,
    translations:{ ...translations },
    options: {
        renderToStaticMarkup,
        defaultLanguage: languages[ 1 ].code,
        onMissingTranslation: () => 'Missing translation'
    }
};
