export enum AppContainers {
    loginForm = 'LOGIN_FORM',
    dialog = 'DIALOG',
    notification = 'NOTIFICATION',
    newUserForm = 'NEW_USER_FORM',
    appMenu = 'APP_MENU',
    welcome = 'WELCOME',
    content = 'CONTENT',
    csr = 'CSR',
    user = 'USER'
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

export enum invalidError {
    noSpaces = 'NO_SPACES',
    notEmpty = 'NOT_EMPTY',
    NO_SPACES = 'noSpaces',
    NOT_EMPTY = 'notEmpty'
};

export enum PasswordTypes {
    newPass = 'NEW_PASS',
    currentPass = 'CURRENT_PASS',
    confirmPass = 'CONFIRM_PASS'
};

export enum LocalStorageItemTypes {
    lessons = 'LESSONS'
};

export enum NotificationVariantTypes {
    smile = 'SMILE'
};

export enum AppRoutes {
    home = '/',
    lessons = '/lessons',
    lesson = '/lessons/lesson-',
    about = '/about',
    login = '/login',
    newuser = '/newuser',
    demo = '/lessons/lesson-demo',
    lessonsGet = '/lessons/get'
};

export enum SubMenuRulesEnum {
    'onlyAuthorized' = 'ONLY_AUTHORIZED',
    'onlyUnauthorized' = 'ONLY_UNAUTHORIZED',
    'notCurrentLocation' = 'NOT_CURRENT_LOCATION'
};

export enum NavRulesEnum {
    'notHome' = 'NOT_HOME',
    'notLesson' = 'NOT_LESSON',
    'notDemoLesson' = 'NOT_DEMO_LESSON',
    'notAnyLesson' = 'NOT_ANY_LESSON',
    'onlyAbout' = 'ONLY_ABOUT',
    'notAbout' = 'NOT_ABOUT'
};