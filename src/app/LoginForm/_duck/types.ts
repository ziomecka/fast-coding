export enum LoginFormActionsEnum {
    APP_LOGINFORM_SET_LOGIN = '@@app_loginForm/SET_LOGINFORM',
    APP_LOGINFORM_RESET = '@@app_loginForm/RESET'
}

export enum LoginFormResponseEnum {
    'INCORRECT_PASSWORD' = 5,
    'SUCCESS' = 1,
    'LOGIN_DOES_NOT_EXIST' = 4,
    'ERROR' = 0
};