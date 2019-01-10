export enum RemindPasswordActionsEnum {
    APP_REMIND_PASSWORD_SET_EMAIL = '@@app_remindPassword/SET_EMAIL',
    APP_REMIND_PASSWORD_RESET = '@@app_remindPassword/RESET'
}

export enum RemindPasswordResponseEnum {
    'SUCCESS' = 1,
    'ERROR' = 0,
    'EMAIL_DOES_NOT_EXIST' = 7
}

/** Interface
 *  @property {string} email
*/
export interface SendFormRemindPasswordI {
    email: string;
}