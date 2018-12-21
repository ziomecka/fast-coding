export enum NewUserFormActionsEnum {
    APP_NEWUSERFORM_SET_LOGIN = '@@app_newuserForm/SET_LOGIN',
    APP_NEWUSERFORM_SET_EMAIL = '@@app_newuserForm/SET_EMAIL',
    APP_NEWUSERFORM_RESET = '@@app_newuserForm/RESET'
}

export enum NewUserFormResponseEnum {
    'ERROR' = 0,
    'SUCCESS' = 1,
    'LOGIN_EXISTS' = 2,
    'EMAIL_EXISTS' = 3
};

/** Interface
 *  @property {string} email
 *  @property {string} password
 *  @property {string} login
*/
export interface SendNewUserFormI {
    email: string;
    password: string;
    login: string;
};

export type NewUserFormErrorType = NewUserFormResponseEnum.ERROR |
    NewUserFormResponseEnum.LOGIN_EXISTS |
    NewUserFormResponseEnum.EMAIL_EXISTS;