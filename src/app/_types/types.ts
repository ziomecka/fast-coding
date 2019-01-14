export enum AppContainersEnum {
    loginForm = 'loginForm',
    dialog = 'dialog',
    notification = 'notification',
    newUserForm = 'newUserForm',
    appMenu = 'appMenu',
    welcome = 'welcome',
    content = 'content',
    csr = 'csr',
    user = 'user',
    formHelperText = 'formHelperText',
    changePasswordForm = 'changePasswordForm',
    keyboardListener = 'keyboardListener',
    remindPasswordForm = 'remindPasswordForm',
    newPasswordForm = 'newPaswordForm',
    googleLogin = 'googleLogin',
    translationsLoader = 'translationsLoader'
}

export enum AppRoutesServerEnum {
    lessonsGet = '/lessons/get',
    newUserSet = '/newuser/post',
    changePassword = '/changepassword/post',
    remindPassword = '/remindpassword/post',
    newPasswordSet = '/newpassword/post',
    translationsGet = '/translations/get',
    loginLog = '/login/log/post',
    loginFirebase = '/login/firebase/post',
    isAuthorized = '/authorized/get'
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
