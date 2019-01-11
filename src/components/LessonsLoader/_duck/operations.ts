import { Dispatch } from 'redux';
import { onLoadData } from '@app/CSR/_duck/operations';
import { buildUrl, URLParamsI} from '@shared/url';

import { AppRoutesServerEnum, LocalStorageItemEnum } from '@appTypes';
import { ComponentsContainersEnum } from '@componentsTypes';
import { ApplicationContainersEnum } from '@applicationTypes';

const { components } = ApplicationContainersEnum;
const { lessonsLoader } = ComponentsContainersEnum;

const _url = AppRoutesServerEnum.lessonsGet;
const defaultParamName = 'login';
const defaultParam = 'basic_user';

const defaultParamNames = {
    [defaultParamName]: defaultParam
};

export const onLoadLessons = ( params: URLParamsI = defaultParamNames, url: string = _url, ): any => ( dispatch: Dispatch ) => {
    const applicationContainer = components;
    const container = lessonsLoader;
    const lsItem = LocalStorageItemEnum.lessons;

    dispatch( onLoadData( buildUrl( params, url ), applicationContainer, container, lsItem, 'lessons' ) );
};

export default {
    onLoadLessons
};
