require('dotenv').config();
const redis = require('redis');
const url = require('url');

const {
    REDIS_KEYS: {
        EMAILS_KEY,
        LOGINS_KEY,
        REMIND_PASSWORD_KEY,
        USERS_KEY
    },
    REDIS_RESPONSES: {
        SUCCESS,
        ERROR,
        LOGIN_ALREADY_EXISTS,
        EMAIL_ALREADY_EXISTS,
        LOGIN_DOES_NOT_EXIST,
        EMAIL_DOES_NOT_EXIST
    },
    REMIND_PASSWORD : { LINK_ACTIVE_MINUTES }
} = require('../constants');

class Redis {
    constructor(REDIS_URI) {
        const { port, hostname, auth } = url.parse(REDIS_URI);

        try {
            this.client = redis.createClient(port, hostname);
        } catch (err) {
            // TODO obsluzyc po stornie klienta
            console.warn(`Redis not available. ${ err.message || err.toString() }`);
        }

        this.client.on('connect', () => console.log('Redis connected'));

        /** Will fire if authorization fails */
        this.client.on('error', err => {
           // TODO obsluzyc po stornie klienta
           console.warn(`Redis error: ${ err.message || err.toString() }`);
       });

       this.client.auth(auth.split(":")[1]);

       this.usersKey = USERS_KEY;
       this.loginsKey = LOGINS_KEY;
       this.emailsKey = EMAILS_KEY;
       this.remindPasswordKey = REMIND_PASSWORD_KEY;
    }

    generateKey (key, value) {
        return `${ key }_${ value }`;
    }

    generateUserKey (value) {
        return this.generateKey(this.usersKey, value);
    }

    generateRemindPasswordKey (value) {
        return this.generateKey(this.remindPasswordKey, value);
    }

    /**
     *
     * @param {object} options
     * @property {string} options.key
     */
    async keyExists(options) {
        return new Promise( ( res, rej ) => {
            this.client.exists( options.key, async (err, response) => {
                if (err) rej(err);
                res(response);
            } );
        });
    }

    /**
     *
     * @param {objecy} options
     * @property {key} options.key
     * @property {string} options.value
     * @property {number} options.expires - time to expire in seconds
     */
    async storeString(options) {
        const { key, value, expires } = options;
        return new Promise (( res, rej) => {
            this.client.set(key, value, (err, response) => {
                if (err) rej(err);
                if (expires) this.client.expire(key, expires);
                res(response);
            })
        });
    }

    /**
     *
     * @param {string} key
     */
    async getString(key) {
        return new Promise ((res, rej) => {
            this.client.get(key, (err, response) => {
                if (err) rej(err);
                res(response);
            });
        });
    }

    /**
     *
     * @param {string} key
     */
    async removeString(key) {
        return new Promise ((res, rej) => {
            this.client.del(key, (err, response) => {
                if (err) rej(err);
                res(response);
            });
        });
    }

    /**
     *
     * @param {object} options
     * @property {string} options.key
     * @property {object} options.data
     * @property {number} options.expires - in seconds
     */
    async storeHash(options) {
        const { key, expires } = options;

        return new Promise( ( res, rej ) => {
            this.client.hmset(key, options.data, (err, response) => {
                if (err) rej(err);
                if (expires) this.client.expire(key, expires);
                res(response);
            });
        });
    }

    /**
     *
     * @param {object} options
     * @property {string} options.key
     * @property {string} options.value
     * @property {number} options.expires
     */
    async storeSet(options) {
        const { key, value, expires } = options;

        return new Promise(( res, rej ) => {
            this.client.sadd(key, value, (err, response) => {
                if (err) rej(err);
                if (expires) this.client.expire(key, expires);
                res(response);
            });
        });
    }

    /**
     * @param {Object} options
     * @property {string} key
     * @property {string} value
     * @returns {string} value
     */
    async removeSet(options) {
        const { key, value } = options;

        return new Promise(( res, rej ) => {
            this.client.spop(key, value, (err, response) => {
                if (err) rej(err);
                res(response);
            });
        });
    }

    /**
     *
     * @param {object} options
     * @property {string} options.key - login
     * @property {object} options.data
     * @property {string} options.data.salt
     * @property {string} options.data.hashPassword
     */
    async setNewUser(options) {
        let { key, data: { email } } = options;

        /** Check if login exists */
        const loginExists = await this.loginExists(key);

        if ( loginExists === LOGIN_ALREADY_EXISTS ) {
            console.log(`Login: ${ key } already exists.`);
            return loginExists;
        };

        try {
            /** Check if email exists */
            const emailExists = await this.emailExists(email);

            if ( emailExists === EMAIL_ALREADY_EXISTS ) {
                console.log(`Set new user ${ key }: email already exists: ${ email }.`);
                return emailExists;
            }
            console.log(`Set new user ${ key }: brand new email: ${ email }.`)

            /** Store login */
            this.storeSet({ key: this.loginsKey, value: key });
            console.log(`Set new user ${ key }: login stored in ${ this.loginsKey }.`)

            /** Store email */
            this.storeSet({ key: this.emailsKey, value: email });
            console.log(`Set new user ${ key }: email: ${ email } stored in ${ this.emailsKey }.`)

            /** Store string: email - login
             * Needed for setting new password in 'remindPassword' process:
             * User sends only email, login is found in redis thanks to this string: email - login
             */
            this.storeString({ key: email, value: key });
            console.log(`Set new user ${ key }: pair email: ${ email } and login: ${ key } stored.`)

            let response = await this.storePassword({ key, data: options.data });

            if (response === SUCCESS) {
                return response;
            }

            console.log(`New user: ${key} NOT set.`)

            /** Clear data if user not set */

            this.removeSet({ key: this.loginsKey, value: key });
            console.log(`Clear Set new user ${ key }: login removed from ${ this.loginsKey }.`)

            this.removeSet({ key: this.emailsKey, value: email });
            console.log(`Clear Set new user ${ key }: email removed from: ${ this.emailsKey }.`)

            this.removeString(email);
            console.log(`Clear Set new user ${ key }: pair email: ${ email } and login: ${ login } removed.`)

            return response;

        } catch (err) {
            console.log(`Setting new user failed: ${ err.message || err.toString() }`);
            return ERROR;
        }
    }

    /**
     *
     * @param {Object} options
     * @property {key}
     * @returns {SUCCESS|ERROR}
     */
    async storePassword(options) {
        let { key } = options;

        try {
            const passwordStored = await this.storeHash({ key: this.generateUserKey(key), data: options.data });

            if ( passwordStored === 'OK' ) {
                console.log(`New user: ${ key } set`);
                return SUCCESS;
            }

            console.log(`Store password for ${ key } failed.`);
            return ERROR;

        } catch (err) {
            console.log(`Store password failed: ${ err.message || err.toString() }`);
            return ERROR;
        }
    }

    /**
     *
     * @param {string} key
     * @param {string} value
     * @returns {Promise<0 || 1>}
     */
    async sismember (key, value) {
        return new Promise( (res, rej) => {
            this.client.sismember(key, value, (err, response) => {
                if (err) rej(err);
                res(response);
            });
        });
    }

    /**
     *
     * @param {string} email
     * @returns {Promise< EMAIL_DOES_NOT_EXIST || EMAIL_ALREADY_EXISTS >}
     */
    async emailExists(email) {
        const response = await this.sismember(this.emailsKey, email);

        if (response === 0) {
            return EMAIL_DOES_NOT_EXIST;
        } else {
            return EMAIL_ALREADY_EXISTS;
        }
    };

    async getKeys (pattern) {
        return new Promise(( res, rej ) => {
            this.keys(pattern, (err, response) => {
                if (err) rej (err);
                res(response);
            });
        });
    }
    /**
     *
     * @param {string} email
     * @returns {Promise< EMAIL_DOES_NOT_EXIST || EMAIL_ALREADY_EXISTS >}
     */
    async loginExists(login) {
        try {
            const response = await this.keys(login);

            if (response) {
                return LOGIN_ALREADY_EXISTS;
            } else {
                return LOGIN_DOES_NOT_EXIST;
            }

        } catch (err) {
            console.log(`Login exists ERROR: ${ err.message || err.toString() }`);
            return ERROR;
        }
    };

    /**
     *
     * @param {object} options
     * @property {string} options.link
     * @property {expires} options.expires - time in seconds, default value 300
     * @property {string} options.email
     */
    async storeRemindPasswordLink(options) {
        const {
            link, expires = LINK_ACTIVE_MINUTES * 60, email
        } = options;

        try {
            const linkStored = await this.storeString({
                key: this.generateRemindPasswordKey(email),
                value: link,
                expires
            });

            if ( linkStored ) {
                console.log(`Link stored: ${ link }`);
                return SUCCESS;
            }

            console.log(`Store link: ${ link } FAILED.`);
            return ERROR;

        } catch (err) {
            console.log(`Store link failed: ${ err.message || err.toString() }`);
            return ERROR;
        }
    }

    /**
     *
     * @param {string} email
     * @returns {string} login
     */
    async getLoginFromEmail(email) {
        return await this.getString(email);
    }

    /**
     *
     * @param {string} email
     * @returns {string} link
     */
    async getRemindPasswordLink(email) {
        return await this.getString(this.generateRemindPasswordKey(email));
    }

    /**
     * @param {Object} options
     * @property {string} options.key
     * @property {Array<string>} options.data - array of hash properties
     */
    async getPassword(options) {
        let { key: _key, ...other } = options;
        const key = this.generateUserKey(_key);

        try {
            const loginExists = await this.loginExists(key);

            if (loginExists === LOGIN_DOES_NOT_EXIST) {
                console.log(`Get password. Login: ${key} DOES NOT exist.`);
                return loginExists;
            };

            return await this.getHash({ key, ...other });
        } catch (err) {
            console.log(`Store password failed: ${ err.message || err.toString() }`);
            return ERROR;
        }
    }

    /**
     *
     * @param {Object} options
     * @property {string} options.key
     * @property {Array<string>} options.data - array of hash's properties
     */
    async getHash(options) {
        return new Promise ( ( res, rej ) => {
            this.client.hmget(options.key, ...options.data, (err, result) => {
                if (err) rej(err);

                res( result.reduce(( acc, cv, ind ) => {
                    acc[options.data[ind]] = cv;
                    return acc;
                }, {}));
            });
        });
    }
};

const _redis = new Redis(process.env.REDIS_URI);

module.exports = _redis;