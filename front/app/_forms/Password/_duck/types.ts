export enum PasswordActionsEnum {
    APP_PASSWORD_SET_PASSWORD_CURRENT = '@@app_password/SET_PASSWORD_CURRENT',
    APP_PASSWORD_SET_PASSWORD_NEW = '@@app_password/SET_PASSWORD_NEW',
    APP_PASSWORD_SET_PASSWORD_CONFIRM = '@@app_password/SET_PASSWORD_CONFIRM',
    APP_PASSWORD_SET_PASSWORD = '@@app_password/SET_PASSWORD',
    APP_PASSWORD_VALIDATE_CURRENT = '@@app_password/VALIDATE_CURRENT',
    APP_PASSWORD_VALIDATE_NEW = '@@app_password/VALIDATE_NEW',
    APP_PASSWORD_VALIDATE_CONFIRM = '@@app_password/VALIDATE_CONFIRM',
    APP_PASSWORD_VALIDATE = '@@app_password/VALIDATE'
}

export enum PasswordsEnum {
    pass = 'PASS',
    newPass = 'NEW_PASS',
    currentPass = 'CURRENT_PASS',
    confirmPass = 'CONFIRM_PASS'
}
