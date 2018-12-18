import { Action, ActionCreator } from 'redux';
import { CSRActionsEnum } from './types';

import { ApplicationContainersEnum } from '@applicationTypes';
import { AppContainersEnum } from '@appTypes';
import { ComponentsContainersEnum } from '@componentsTypes';

const {
    APP_CSR_CHANGE_LOADING_STATE,
    APP_CSR_REPORT_ERROR,
    APP_CSR_UPDATE_DATA
} = CSRActionsEnum;

export const changeLoadingState: ActionCreator<ChangeLoadingStateAction> = (loading: boolean, applicationContainer: ApplicationContainersEnum, container: AppContainersEnum | ComponentsContainersEnum) => ({
    type: APP_CSR_CHANGE_LOADING_STATE,
    loading,
    applicationContainer,
    container,
});

export const updateData: ActionCreator<UpdateDataAction> = (data: Object | Array<Object>, applicationContainer: ApplicationContainersEnum, container: AppContainersEnum | ComponentsContainersEnum) => ({
    type: APP_CSR_UPDATE_DATA,
    data,
    applicationContainer,
    container
});

export const reportError: ActionCreator<ReportErrorAction> = (error: string, applicationContainer: ApplicationContainersEnum, container: AppContainersEnum | ComponentsContainersEnum) => ({
    type: APP_CSR_REPORT_ERROR,
    error,
    applicationContainer,
    container,
});

export default {
    changeLoadingState,
    updateData,
    reportError
};

export interface ChangeLoadingStateAction extends Action {
    readonly type: string;
    loading?: boolean;
    applicationContainer: ApplicationContainersEnum;
    container: AppContainersEnum | ComponentsContainersEnum;
};

export interface UpdateDataAction extends Action {
    readonly type: string;
    data: Object | Array<Object>;
    applicationContainer: ApplicationContainersEnum;
    container: AppContainersEnum | ComponentsContainersEnum;
};

export interface ReportErrorAction extends Action {
    readonly type: string;
    error: string;
    applicationContainer: ApplicationContainersEnum;
    container: AppContainersEnum | ComponentsContainersEnum;
};

export type CSRActions = ChangeLoadingStateAction | UpdateDataAction | ReportErrorAction;