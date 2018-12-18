import { Dispatch } from 'redux';
import { onLoadData } from '../../../app/CSR/_duck/operations';
import * as urlFuncs from '../../../shared/url';
import { URLParamsI } from '../../../shared/url';

const { buildUrl } = urlFuncs;

import { AppRoutesEnum, ApplicationContainers, ComponentsContainersEnum, LocalStorageItemTypes } from '@applicationTypes';

const { components  } = ApplicationContainers;
const { lessonsLoader } = ComponentsContainersEnum;

const _url = AppRoutesEnum.lessonsGet;
const defaultParamName = 'login';
const defaultParam = 'basic_user';

const defaultParamNames = {
    [defaultParamName]: defaultParam
};

export const onLoadLessons = (params: URLParamsI = defaultParamNames, url: string = _url, ): any => (dispatch: Dispatch) => {
    const applicationContainer = components;
    const container = lessonsLoader;
    const lsItem = LocalStorageItemTypes.lessons;

    dispatch(onLoadData(buildUrl(params, url), applicationContainer, container, lsItem, 'lessons'));
};

export default {
    onLoadLessons
};