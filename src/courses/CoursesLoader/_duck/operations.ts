import { Dispatch } from 'redux';
import { onLoadData } from '@app/CSR/_duck/operations';
import { buildUrl, URLParamsI } from '@shared/url';

import { AppRoutesServerEnum, LocalStorageItemEnum } from '@appTypes';
import { CoursesContainersEnum } from '@coursesTypes';
import { ApplicationContainersEnum } from '@applicationTypes';

const { courses } = ApplicationContainersEnum;
const { coursesLoader } = CoursesContainersEnum;

const _url = AppRoutesServerEnum.lessonsGet;
const defaultParamName = 'login';
const defaultParam = 'basic_user';

const defaultParamNames = {
    [ defaultParamName ]: defaultParam
};

export const onLoadLessons = ( params: URLParamsI = defaultParamNames, url: string = _url, ): any => ( dispatch: Dispatch ) => {
    const applicationContainer = courses;
    const container = coursesLoader;
    const lsItem = LocalStorageItemEnum.courses;

    dispatch( onLoadData( buildUrl( params, url ), applicationContainer, container, lsItem, 'lessons' ) );
};

export default {
    onLoadLessons
};
