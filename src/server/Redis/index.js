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
            console.warn(`Redis not available. ${err.message || err.toString()}`);
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
     * @property {string} options.key
     * @property {object} options.data
     * @property {string} options.data.salt
     * @property {string} options.data.hashPassword
     */
    async setNewUser(options) {
        let { key } = options;

        /** Check if login exists */
        const loginExists = await this.loginExists(key);

        if ( loginExists === LOGIN_ALREADY_EXISTS ) {
            console.log('Login already exists.');
            return loginExists;
        };

        try {
            /** Check if email exists */
            const emailExists = await this.emailExists(options.data.email);

            if ( emailExists === EMAIL_ALREADY_EXISTS ) {
                console.log('Email already exists.');
                return emailExists;
            }

            /** Store login and email */
            this.storeSet({ key: this.loginsKey, value: key });
            this.storeSet({ key: this.emailsKey, value: options.data.email });

            return await this.storePassword({ key, data: options.data })

        } catch (err) {
            console.log('Setting new user failed.');
            return ERROR;
        }
    }

    async storePassword(options) {
        let { key } = options;

        try {
            const passwordStored = await this.storeHash({ key: this.generateUserKey(key), data: options.data });

            if ( passwordStored === 'OK' ) {
                console.log('New user set');
                return SUCCESS;
            }

            console.log('Store password failed.');
            return ERROR;

        } catch (err) {
            console.log('Store password failed.');
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

    /**
     *
     * @param {string} email
     * @returns {Promise< EMAIL_DOES_NOT_EXIST || EMAIL_ALREADY_EXISTS >}
     */
    async loginExists(login) {
        const response = await this.sismember(this.loginsKey, login);

        if (response === 0) {
            return LOGIN_DOES_NOT_EXIST;
        } else {
            return LOGIN_ALREADY_EXISTS;
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
                console.log('Link stored');
                return SUCCESS;
            }

            console.log('Store link failed.');
            return ERROR;

        } catch (err) {
            console.log('Store link failed.');
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

    async getPassword(options) {
        let { key: _key, ...other } = options;
        const key = this.generateUserKey(_key);

        try {
            const loginExists = await this.loginExists(key);

            if (loginExists === LOGIN_DOES_NOT_EXIST) {
                console.log('Login does not exist.');
                return loginExists;
            };

            return await this.getHash({ key, ...other });
        } catch (err) {
            console.log('Store password failed.');
            return ERROR;
        }
    }

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