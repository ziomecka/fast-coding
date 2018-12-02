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

        /** Loading => true */
        dispatch(changeLoadingState(true, applicationContainer, container));

        let localStorage = localStorageGetItem(lsItem);

        /** lsItem.toLowerCase() => string under which data will be saved in new state
         *  see reducer
        */
        dispatch(updateData({ [`${lsItem.toLowerCase()}`]: localStorage }, applicationContainer, container));

        /** If data was in local storage
         *  Loading => false
        */
        if(localStorage) {
            dispatch(changeLoadingState(false, applicationContainer, container, lsItem));
            localStorage = null; // GC
        }

        try {
            let data = await getData(url);
            dispatch(updateData({ [stateName]: data }, applicationContainer, container));
            localStorageSetItem(lsItem, data);
        }
        catch (err) {
            dispatch(reportError(
                err,
                applicationContainer,
                container
            ));
        }
        finally {
            dispatch(changeLoadingState(false, applicationContainer, container));
        }
    }
);