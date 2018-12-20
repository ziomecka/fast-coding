// TODO po stronie serwera walidacja hasła zrobiona na stronie: liczba znaków etc
const _crypto = require('crypto');
const redis = require('../Redis/index');
const getUUID = require('uuid/v1');
const sendEmail = require('../Email/index');

const {
    PASSWORD_MANAGER_RESPONSES: {
        ERROR,
        LOGIN_DOES_NOT_EXIST,
        SUCCESS,
        INCORRECT_PASSWORD,
        INCORRECT_CURRENT_PASSWORD
    },
    EMAIL_RESPONSES: {
        ERROR: EMAIL_ERROR
    },
    ROUTES: { CHANGE_PASSWORD },
    DOMAIN
} = require('../constants');

class PasswordManager {
    constructor(options = {}) {
        this.saltSize = options.saltSize || 50;
        this._redis = redis;
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

        return `${ DOMAIN }${ NEW_PASSWORD }?${ QUERY_PARAM_KEY }=${ uuid }&${ QUERY_PARAM_EMAIL }=${ email }`;
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

        return {
            salt,
            passwordHash
        };
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

        try {
            return await this.redis.setNewUser({
                key: login,
                data: { passwordHash, salt, email }
            });
        } catch (err) {
            console.warn(`Set new user error: ${err.message || err.toString()}`);
            return ERROR;
        }
    }

    async changePassword(options) {
        let { login, currentPassword, newPassword } = options;

        const response = await this.verifyPassword({ login, password: currentPassword });

        if ( response === SUCCESS ) {
            const { passwordHash, salt } = this._encrypt(newPassword, this._getSalt());

            return await this.redis.storePassword({
                key: login,
                data: { passwordHash, salt }
            });
        }

        return INCORRECT_CURRENT_PASSWORD;
    }

    async verifyPassword(options) {
        const { login, password } = options;

        let response;

        try {
            response = await this.redis.getPassword({ key: login, data: ['salt', 'passwordHash'] });
        } catch (err) {
            console.warn(`Verify password error: ${err.message || err.toString()}`);
            return ERROR;
        }

        if (response === LOGIN_DOES_NOT_EXIST) {
            return response;
        }

        const { passwordHash: storedPasswordHash, salt: storedSalt } = response;
        const { passwordHash } = this._encrypt( password, storedSalt );

        const passwordValid = storedPasswordHash === passwordHash;

        response = null; // GC
        return passwordValid? SUCCESS : INCORRECT_PASSWORD;
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
        if (response === SUCCESS) {
            console.log(`Remind password valid request. Email: ${email}`);
            const _uuid = uuid();
            const link = this.changePasswordURI(_uuid);

            const linkStored = await this.redis.storeRemindPasswordLink({ link: _uuid, email });

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

    async validateRemindPasswordLink(options) {
        const { email, link } = options;

        const linkStored = await this.redis.getRemindPasswordLink({ email });

        if (linkStored === link) {
            // if in redis change password
            // send success
        } else {
            console.warn(`Remind password INVALID link: ${ link } for: ${ email }`);
            // return error
        }
    }
};

const passwordManager = new PasswordManager();

module.exports = passwordManager;