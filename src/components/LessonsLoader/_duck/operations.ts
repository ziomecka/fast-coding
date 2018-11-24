import { Dispatch } from 'redux';
import { onLoadData } from '../../../app/CSR/_duck/operations';

import { ApplicationContainers, ComponentsContainers, LocalStorageItemTypes } from '../../../_common';

const { components  } = ApplicationContainers;
const { lessonsLoader } = ComponentsContainers;

const url = '/lessons/get';

export const onLoadLessons = (): any => (dispatch: Dispatch) => {
    const applicationContainer = components;
    const container = lessonsLoader;
    const lsItem = LocalStorageItemTypes.lessons;
    dispatch(onLoadData(url, applicationContainer, container, lsItem));
}

export default {
    onLoadLessons
};
