import { Dispatch } from 'redux';
import getData from '../../api';

import { changeLoadingState, updateData, reportError } from './actions';

import { ApplicationContainers, ComponentsContainers, AppContainers} from '../../../_common/';
import {
    localStorageGetItem,
    localStorageSetItem
} from '../../../app/LocalStorage/_duck/operations';

import { LocalStorageItemTypes } from '../../_common/index';

export const onLoadData =
(url: string, applicationContainer: ApplicationContainers, container: ComponentsContainers | AppContainers, lsItem: LocalStorageItemTypes, stateName: string): any => (
    async (dispatch: Dispatch): Promise<any> => {
        dispatch(updateData(localStorageGetItem(lsItem), applicationContainer, container));

        dispatch(changeLoadingState(true, applicationContainer, container));

        try {
            let data = await getData(url);
            dispatch(updateData({ [stateName]: data }, applicationContainer, container));
            localStorageSetItem(lsItem, data);
            // console.log('in LS')
            // console.log(localStorageGetItem(lsItem))
            // console.log('end')
        }
        catch (err) {
            dispatch(reportError());
        }
        finally {
            dispatch(changeLoadingState(false, applicationContainer, container));
        }
    }
);