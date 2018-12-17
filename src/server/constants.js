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
    EMAIL_DOES_NOT_EXIST: 7
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
    CHANGE_PASSWORD: '/changepassword',
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
    LINK_ACTIVE_MINUTES: 5
};

const REDIS_KEYS = {
    USERS_KEY: 'user_data',
    EMAILS_KEY: 'users_emails',
    LOGINS_KEY: 'users_logins',
    REMIND_PASSWORD_KEY: 'maintain_remindPassword'
}

module.exports = {
    DOMAIN,
    PORT,
    REDIS_RESPONSES,
    REDIS_KEYS,
    REMIND_PASSWORD,
    PASSWORD_MANAGER_RESPONSES,
    ROUTES,
    EMAILS,
    EMAIL_RESPONSES
};
