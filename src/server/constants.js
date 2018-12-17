const PORT = 3000;

/** Server responses */
const BASIC_RESPONSES = {
    ERROR: 0,
    SUCCESS: 1,
};

const REDIS_PASSWORD_RESPONSES = {
    LOGIN_ALREADY_EXISTS: 2,
    EMAIL_ALREADY_EXISTS: 3,
    LOGIN_DOES_NOT_EXIST: 4,
    INCORRECT_PASSWORD: 5,
    INCORRECT_CURRENT_PASSWORD: 6
};

const REDIS_RESPONSES = {
    ...BASIC_RESPONSES,
    ...REDIS_PASSWORD_RESPONSES
};

const EMAIL_RESPONSES = {
    ...BASIC_RESPONSES
};

const PASSWORD_MANAGER_RESPONSES = {
    ...BASIC_RESPONSES,
    ...REDIS_PASSWORD_RESPONSES
};

const ROUTES = {
    LESSONS_GET: '/lessons/get',
    NEW_USER_SET: '/newuser/set',
    LOGIN_LOG: '/login/log',
    CHANGE_PASSWORD: '/changepassword'
};

const EMAILS = {
    ADDRESS_FROM: 'hello',
    DOMAIN: 'letsbitebytes.com',
    NAME: 'Kasia Ziomek-Zdanowicz',
    EMAIL_RESPONSES,
    PAGE: {
        pl: 'Fast coding',
        en: 'Fast coding'
    },
};

module.exports = {
    PORT,
    REDIS_RESPONSES,
    PASSWORD_MANAGER_RESPONSES,
    ROUTES,
    EMAILS,
    EMAIL_RESPONSES
};
