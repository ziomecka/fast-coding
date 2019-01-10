import { GetLessonsResponseI } from '@components/LessonsLoader/_duck/types';

export enum CSRActionsEnum {
    APP_CSR_CHANGE_LOADING_STATE = '@@app_csr/CHANGE_LOADING_STATE',
    APP_CSR_UPDATE_DATA = '@@app_csr/UPDATE_DATA',
    APP_CSR_REPORT_ERROR = '@@app_csr/REPORT_ERROR'
}

export type GetDataType = GetLessonsResponseI;