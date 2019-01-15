const { QUERY_PARAM_KEY, QUERY_PARAM_EMAIL, QUERY_PARAM_KEY_LENGTH } = require('./constants.client');
const PORT = 3000;
const DOMAIN = 'fast-coding.herokuapp.com';

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
    INCORRECT_CURRENT_PASSWORD: 6,
    EMAIL_DOES_NOT_EXIST: 7,
    QUERY_IS_VALID: 8,
    QUERY_IS_INVALID: 9
};

const REDIS_RESPONSES = {
    ...BASIC_RESPONSES,
    ...REDIS_PASSWORD_RESPONSES
};

const EMAIL_RESPONSES = {
    ...BASIC_RESPONSES
};

// TODO
// to się niewygodnie koduje, do zmiany, bo trzeba uważać czy ciągła numeracj
// zmienić liczby na string?
const PASSWORD_MANAGER_RESPONSES = {
    ...BASIC_RESPONSES,
    ...REDIS_PASSWORD_RESPONSES,
    LINK_IS_INVALID: 10,
    LOGIN_IS_MISSING: 11
};

const ROUTES = {
    LESSONS_GET: '/lessons/get',
    TRANSLATIONS_GET: '/translations/get',
    NEW_USER_SET: '/newuser/post',
    LOGIN_LOG: '/login/log/post',
    CHANGE_PASSWORD: '/changepassword/post',
    NEW_PASSWORD: '/newpassword/post',
    REMIND_PASSWORD: '/remindpassword/post',
    IS_AUTHORIZED: '/authorized/get',
    LOGIN_FIREBASE: '/login/firebase/post',
    LOGOUT: '/login/logout/get'
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

const REMIND_PASSWORD = {
    LINK_ACTIVE_MINUTES: 15,
    QUERY_PARAM_KEY,
    QUERY_PARAM_EMAIL,
    QUERY_PARAM_KEY_LENGTH
};

const REDIS_KEYS = {
    USERS_KEY: 'user_data',
    EMAILS_KEY: 'users_emails',
    LOGINS_KEY: 'users_logins',
    REMIND_PASSWORD_KEY: 'maintain_remindPassword',
    SESSION: 'session_'
};

const CORS = {
    localhost: `http://www.localhost:${ PORT }`,
    production: 'https://fast-coding.herokuapp.com',
    exposedHeaders: [ 'Content-Type' ]
};

const SESSION = {
    NAME: 'FC_SESSION',
    MINUTES: 60,
    MAX_AGE: 1000 * 60 * 60,
    ROUTES: [
        '/',
        ROUTES.LESSONS_GET,
        ROUTES.LOGIN_LOG,
        ROUTES.NEW_PASSWORD,
        ROUTES.NEW_USER_SET,
        ROUTES.REMIND_PASSWORD,
        ROUTES.TRANSLATIONS_GET
    ]
};

const GOOGLE = {
    HOST: 'securetoken.googleapis.com',
    PATH: '/v1/token'
};

module.exports = {
    DOMAIN,
    PORT,
    REDIS_RESPONSES,
    REDIS_KEYS,
    REMIND_PASSWORD,
    PASSWORD_MANAGER_RESPONSES,
    ROUTES,
    EMAILS,
    EMAIL_RESPONSES,
    CORS,
    SESSION,
    GOOGLE
};
