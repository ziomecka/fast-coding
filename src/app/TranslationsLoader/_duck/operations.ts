import { Dispatch } from 'redux';

import { AppRoutesEnum } from '@appTypes';
import { get } from '@app/api/';

import { GetTranslationsResponseI } from './types';
import { saveTranslations } from './actions';

const _url = AppRoutesEnum.translationsGet;

export const onLoadTranslations = (url: string = _url ): any => (
    async (dispatch: Dispatch): Promise<boolean> => {
        try {
            let data = await get({ path: url }) as GetTranslationsResponseI;
            let answer = await dispatch(saveTranslations(data.translations));
            data = null; // GC

            if ( answer ) {
                answer = null; // GC
                return true;
            }
        // TODO catch err
        /* eslint-disable no-empty */
        } catch (err) {}
        /* eslint-enable no-empty */
});

export default {
    onLoadTranslations
};