// TODO po stronie serwera:
// walidacja hasła zrobiona na stronie: liczba znaków etc

const _crypto = require('crypto');
const redis = require('../Redis/index');
const getUUID = require('uuid/v1');
const sendEmail = require('../Email/index');

const {
    PASSWORD_MANAGER_RESPONSES: {
        ERROR,
        LOGIN_DOES_NOT_EXIST,
        EMAIL_ALREADY_EXISTS,
        SUCCESS,
        INCORRECT_PASSWORD,
        INCORRECT_CURRENT_PASSWORD,
        QUERY_IS_INVALID,
        LINK_IS_INVALID,
        LOGIN_IS_MISSING
    },
    EMAIL_RESPONSES: {
        ERROR: EMAIL_ERROR
    },
    ROUTES: { NEW_PASSWORD },
    DOMAIN,
    REMIND_PASSWORD: { QUERY_PARAM_KEY, QUERY_PARAM_EMAIL, QUERY_PARAM_LENGTH }
} = require('../constants');

class PasswordManager {
    constructor(options = {}) {
        this.saltSize = options.saltSize || 50;
        this._redis = redis;
        this.queryParamLength = QUERY_PARAM_LENGTH;
    }

    // TODO - zakodować coś bardziej uniwerslnego
    /**
     *
     * @param {Object} options
     * @property {string} options.email
     * @property {string} options.uuid - optional
     */
    newPasswordURI(options) {
        const {
            uuid = getUUID(this.queryParamLength),
            email
        } = options

        return `https://${ DOMAIN }${ NEW_PASSWORD }?${ QUERY_PARAM_KEY }=${ uuid }&${ QUERY_PARAM_EMAIL }=${ email }`;
    }

    changePasswordURI(uuid) {
        return `${ this._changePasswordURI }${ uuid }`;
    }

    get redis() {
        try {
            return this._redis;
        } catch (err) {
            throw new Error(`Redis initialization failed. ${ err.message || err.toString() }`);
        }
    }

    _getSalt(length = this.saltSize) {
        return _crypto.randomBytes(length).toString('hex').slice(0, length);
    }

    _sha512(password, salt) {
        let hash = _crypto.createHmac('sha512', salt);
        const passwordHash = hash.update(password).digest('hex');

        return { salt, passwordHash };
    }

    _encrypt(password, salt) {
        return { ...this._sha512(password, salt) };
    }

    async setNewUser(options) {
        let { login, password, email } = options;

        if ( !login || ! password  || !email ) {
            throw new Error('Login, password and email must be a non-empty string');
        }

        const { passwordHash, salt } = this._encrypt(password, this._getSalt());

        return await this.redis.setNewUser({
            key: login,
            data: { passwordHash, salt, email }
        });
    }

    /**
     *
     * @param {Object} options
     * @param {string} options.login
     * @param {string} options.newPassword
     */
    async setPassword(options) {
        let { login, newPassword } = options;

            const { passwordHash, salt } = this._encrypt(newPassword, this._getSalt());

            return await this.redis.storePassword({
                key: login,
                data: { passwordHash, salt }
            });
    }

    /**
     *
     * @param {Object} options
     * @param {string} options.login
     * @param {string} options.currentPassword
     * @param {string} options.newPassword
     */
    async changePassword(options) {
        let { login, currentPassword, newPassword } = options;

        const response = await this.verifyPassword({ login, password: currentPassword });

        if ( response === SUCCESS ) {
            return await this.setPassword({ login, newPassword });
        }

        return INCORRECT_CURRENT_PASSWORD;
    }

    /**
     *
     * @param {Object} options
     * @param {string} options.login
     * @param {string} options.password
     * @returns {Object} object
     * @returns {number} object.result
     * @returns {string} object.token - optional
     */
    async verifyPassword(options) {
        const { login, password } = options;

        let response;

        try {
            response = await this.redis.getPassword({ key: login, data: ['salt', 'passwordHash'] });
        } catch (err) {
            console.warn(`Verify password error: get password: ${err.message || err.toString()}`);
            return { result: ERROR };
        }

        if (response === LOGIN_DOES_NOT_EXIST) {
            return { result: response };
        }

        const { passwordHash: storedPasswordHash, salt: storedSalt } = response;
        const { passwordHash } = this._encrypt( password, storedSalt );

        const passwordValid = storedPasswordHash === passwordHash;

        response = null; // GC
        const token = getUUID();
                return {
                    result: passwordValid? SUCCESS : INCORRECT_PASSWORD,
                    token
                };
    }

    // TODO at present only one link can be stored in redis
    // TODO what if client generates several links?
    // Send the same link but change expiiry?
    // Or do not allow to generate new link if one is still valid - retur error
    /**
     *
     * @param {Object} options email: string
     * @returns {0 || 1} BASIC_RESPONSES: ERROR || SUCCESS
     */
    async prepareRemindPasswordLink(options) {
        const { email } = options;

        let response;

        /** Check if email exists in redis */
        try {
            response = await this.redis.emailExists(email);
        } catch (err) {
            console.warn(`Remind password error: ${err.message || err.toString()}`);
            return ERROR;
        }

        /** Store link in redis */
        if ( response === EMAIL_ALREADY_EXISTS ) {
            console.log(`Remind password valid request. Email: ${ email }`);

            const link = this.newPasswordURI({ email });
            const linkStored = await this.redis.storeRemindPasswordLink({ link, email });

            /** Send email */
            if (linkStored === SUCCESS) {
                const mailSent = await sendEmail({
                    recipients: [ { address: email } ],
                    emailVariant: 'remindPassword',
                    link
                });

                if ( mailSent === EMAIL_ERROR) {
                    console.warn(`Remind password ERROR. Mail not sent. Link: ${ link } for: ${ email }`);
                } else {
                    console.log(`Remind password. Mail sent. Link: ${ link } for: ${ email }`);
                }

                return mailSent;
            } else {
                console.warn(`Remind password ERROR. Link: ${ link } not stored for: ${ email }`);
                return linkStored;
            }
        } else {
            console.warn(`Remind password INVALID request. Invalid email: ${ email }`);
            return response;
        }
    }

    /**
     *
     * @param {Object} options
     * @property {string} options.email
     * @property {string} options.key
     * @property {string} options.newPassword
     *
     */
    async setNewPassword(options) {
        const { email, key, newPassword } = options;
        if (!email || !key) {
            return QUERY_IS_INVALID;
        }

        let storedLink = await this.redis.getRemindPasswordLink(email);
        let login = await this.redis.getLoginFromEmail(email);

        if (storedLink === ERROR || login === ERROR) {
            return {
                result: ERROR
            };
        }

        const link = this.newPasswordURI({ email, uuid: key });

        if (!storedLink || storedLink !== link) {
            return {
                result: LINK_IS_INVALID
            };
        }

        if (!login) {
            return {
                result: LOGIN_IS_MISSING // TODO - obsłużyć po stronie klienta
            };
        }

        return await this.setPassword({ login, newPassword });
    }
};

const passwordManager = new PasswordManager();

module.exports = passwordManager;