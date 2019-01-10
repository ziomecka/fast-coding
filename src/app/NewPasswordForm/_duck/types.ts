export enum NewPasswordFormActionsEnum {
    APP_REMIND_PASSWORD_SET_EMAIL = '@@app_newPasswordForm/SET_EMAIL',
    APP_REMIND_PASSWORD_RESET = '@@app_newPasswordForm/RESET'
}

export enum NewPasswordFormResponseEnum {
    'SUCCESS' = 1,
    'ERROR' = 0,
    'INVALID_REMIND_PASSWORD_LINK' = 7
}

/** Interface
 *  @property {string} newPassword
 *  @property {string} key
*/
export interface SendFormNewPasswordFormI {
    newPassword: string;
    key: string;
    email: string;
}