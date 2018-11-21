export enum AppContainers {
    loginForm = 'LOGIN_FORM',
    dialog = 'DIALOG',
    notification = 'NOTIFICATION',
    newUserForm = 'NEW_USER_FORM',
    appMenu = 'APP_MENU',
    welcome = 'WELCOME',
    content = 'CONTENT',
    csr = 'CSR'
};

export enum MenuContainers {
    userMenu = 'USER_MENU',
    mainMenu = 'MAIN_MENU'
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