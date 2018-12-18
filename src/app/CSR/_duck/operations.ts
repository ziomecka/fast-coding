import { Dispatch } from 'redux';
import { get as getData } from '../../api';
import { GetDataType } from './types';

import { changeLoadingState, updateData, reportError } from './actions';

import { ApplicationContainers, ComponentsContainersEnum, AppContainersEnum} from '@applicationTypes';
import {
    localStorageGetItem,
    localStorageSetItem
} from '../../../app/LocalStorage/_duck/operations';

import { LocalStorageItemEnum } from '@appTypes';

export const onLoadData =
(url: string, applicationContainer: ApplicationContainers, container: ComponentsContainersEnum | AppContainersEnum, lsItem: LocalStorageItemEnum, stateName: string): any => (
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
            let data = await getData({ path: url }) as GetDataType;
            dispatch(updateData({ [stateName]: data[stateName] }, applicationContainer, container));
            localStorageSetItem(lsItem, data[stateName]);
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