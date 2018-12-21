const { QUERY_PARAM_KEY, QUERY_PARAM_EMAIL, QUERY_PARAM_KEY_LENGTH } = require('./constants.client');
const PORT = 3000;
const DOMAIN = 'https://fast-coding.herokuapp.com';

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
    NEW_USER_SET: '/newuser/set',
    LOGIN_LOG: '/login/log',
    CHANGE_PASSWORD: '/changepassword',
    NEW_PASSWORD: '/newpassword',
    REMIND_PASSWORD: '/remindpassword'
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
    REMIND_PASSWORD_KEY: 'maintain_remindPassword'
};

const CORS = {
    localhost: `http://www.localhost:${ PORT }`,
    production: 'https://fast-coding.herokuapp.com',
    exposedHeaders: [ 'Content-Type' ]
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
    CORS
};
