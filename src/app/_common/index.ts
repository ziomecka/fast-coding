export enum AppContainers {
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
    changePasswordForm = 'CHANGE_PASSWORD_FORM'
};

export enum MenuContainers {
    userMenu = 'USER_MENU',
    mainMenu = 'MAIN_MENU',
    languagesMenu = 'LANGUAGES_MENU'
};

export enum AppLocation {
    isHome = 'IS_HOME',
    isLesson = 'IS_LESSON',
    isOther = 'IS_OTHER'
};

export enum PasswordTypes {
    pass = 'PASS',
    newPass = 'NEW_PASS',
    currentPass = 'CURRENT_PASS',
    confirmPass = 'CONFIRM_PASS'
};

export enum LocalStorageItemTypes {
    lessons = 'LESSONS',
    comparator = 'COMPARATOR',
    lesson = 'LESSON',
    stats = 'STATS'
};

export enum NotificationVariantTypes {
    smile = 'SMILE'
};

export enum AppRoutes {
    home = '/',
    lessons = '/lessons',
    lesson = '/lessons/lesson-',
    login = '/login',
    newuser = '/newuser',
    demo = '/lessons/lesson-demo',
    lessonsGet = '/lessons/get',
    newUserSet = '/newuser/set',
    loginLog = '/login/log',
    changePassword = '/changepassword'
};

export enum SubMenuRulesEnum {
    'onlyAuthorized' = 'ONLY_AUTHORIZED',
    'onlyUnauthorized' = 'ONLY_UNAUTHORIZED',
    'notCurrentLocation' = 'NOT_CURRENT_LOCATION',
    'notActiveLanguage' = 'NOT_ACTIVE_LANGUAGE'
};

export enum NavRulesEnum {
    'notHome' = 'NOT_HOME',
    'notLesson' = 'NOT_LESSON',
    'notDemoLesson' = 'NOT_DEMO_LESSON',
    'notAnyLesson' = 'NOT_ANY_LESSON'
};

export enum LanguagesEnum {
    pl = 'pl',
    en = 'en'
};