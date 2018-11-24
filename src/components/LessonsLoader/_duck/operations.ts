import { Dispatch } from 'redux';
import { onLoadData } from '../../../app/CSR/_duck/operations';
import * as urlFuncs from '../../../shared/url';
import { URLParamsI } from '../../../shared/url';

const { buildUrl } = urlFuncs;

import { ApplicationContainers, ComponentsContainers, LocalStorageItemTypes } from '../../../_common';

const { components  } = ApplicationContainers;
const { lessonsLoader } = ComponentsContainers;

const _url = '/lessons/get';
const defaultParamName = 'login';
const defaultParam = 'basic_user';

const defaultParamNames = {
    [defaultParamName]: defaultParam
};

export const onLoadLessons = (params: URLParamsI = defaultParamNames, url: string = _url, ): any => (dispatch: Dispatch) => {
    const applicationContainer = components;
    const container = lessonsLoader;
    const lsItem = LocalStorageItemTypes.lessons;

    dispatch(onLoadData(buildUrl(params, url), applicationContainer, container, lsItem));
};

export default {
    onLoadLessons
};