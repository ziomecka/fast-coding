export enum AppContainersEnum {
    loginForm = 'LOGIN_FORM',
    dialog = 'DIALOG',
    notification = 'NOTIFICATION',
    newUserForm = 'NEW_USER_FORM',
    appMenu = 'APP_MENU',
    welcome = 'WELCOME',
    content = 'CONTENT',
    csr = 'CSR',
    user = 'USER',
    formHelperText = 'FORM_HELPER_TEXT',
    changePasswordForm = 'CHANGE_PASSWORD_FORM',
    keyboardListener = 'KEYBOARD_LISTENER',
    remindPasswordForm = 'REMIND_PASSWORD',
    newPasswordForm = 'NEW_PASSWORD',
    googleLogin = 'GOOGLE_LOGIN',
    translationsLoader = 'TRANSLATIONS_LOADER'
}

export enum AppRoutesServerEnum {
    lessonsGet = '/lessons/get',
    newUserSet = '/newuser/post',
    changePassword = '/changepassword/post',
    remindPassword = '/remindpassword/post',
    newPasswordSet = '/newpassword/post',
    translationsGet = '/translations/get',
    loginLog = '/login/log',
}

export enum AppRoutesEnum {
    home = '/',
    lessons = '/lessons',
    lesson = '/lessons/lesson-',
    demo = '/lessons/lesson-demo',
    privacyPolicy = '/privacyPolicy',
    termsOfService = '/termsOfService',
    newUser = '/newuser',
    changePassword = '/changepassword',
    remindPassword = '/remindpassword',
    login = '/login',
}
