require('dotenv').config();
const redis = require('redis');
const url = require('url');

const {
    SUCCESS,
    ERROR,
    LOGIN_ALREADY_EXISTS,
    EMAIL_ALREADY_EXISTS,
    LOGIN_DOES_NOT_EXIST
} = require('../constants').REDIS_RESPONSES;

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
    }

    async keyExists(options) {
        return new Promise( ( res, rej ) => {
            this.client.exists( options.key, async (err, response) => {
                if (err) rej(err);
                res(response);
            } );
        });
    }

    async storeHash(options) {
        return new Promise( ( res, rej ) => {
            this.client.hmset(options.key, options.data, (err, response) => {
                if (err) throw rej(err);
                res(response);
            });
        });
    }

    async storeSet(options) {
        let { key, value } = options;

        return new Promise(( res, rej ) => {
            this.client.sadd(key, value, (err, response) => {
                if (err) rej(err);
                res(response);
            });
        });
    }

    async setNewUser(options) {
        let { key } = options;

        const keyExists = await this.keyExists({ key })

        if ( keyExists ) {
            console.log('Login already exists.');
            return LOGIN_ALREADY_EXISTS;
        };

        try {
            const emailExists = await this.storeSet({ key: 'login', value: options.data.email });

            if (emailExists === 0) {
                console.log('Email already exists.');
                return EMAIL_ALREADY_EXISTS;
            }

            return await this.storePassword({ key, data: options.data }) //, callback: async (result) => {

        } catch (err) {
            console.log('Setting new user failed.');
            return ERROR;
        }
    }

    async storePassword(options) {
        let { key } = options;

        try {
            const passwordStored = await this.storeHash({ key, data: options.data });

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

    async getPassword(options) {
        let { key } = options;

        try {
            const keyExists = await this.keyExists({ key });

            if (!keyExists) {
                console.log('Login does not exist.');
                return LOGIN_DOES_NOT_EXIST;
            };

            return await this.getHash(options);
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