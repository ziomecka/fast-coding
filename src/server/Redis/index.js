const redis = require('redis');
const url = require('url');

class Redis {
    constructor(REDIS_URI) {
        const { port, hostname, auth } = url.parse(REDIS_URI);
        // console.log(`port: ${port} hostname: ${hostname} auth: ${auth}`)

        try {
            this.client = redis.createClient(port, hostname);
            this.client.on('connect', () => console.log('Redis connected'));
            this.client.auth(auth.split(":")[1]);
        } catch (err) {
            throw new Error(`Redis not authorized. ${err.message || err.toString()}`);
        }
    }

    async keyExists(options) {
        const { key } = options;

        if ( typeof options.callback !== 'function' ) {
            throw new Error('Redis exists. Callback is not a function');
        }

        try {
            this.client.exists( key, async (err, response) => {
                if (err) throw err;
                options.callback(response);
            } );
        } catch (err) {
            throw new Error(`Key exists failed ${err.message || err.toString()}`);
        }
    }

    storeHash(options) {
        if ( typeof options.callback !== 'function' ) {
            throw new Error('Redis store hash. Callback is not a function');
        }

        let { key, data } = options;

        this.client.hmset(key, data, (err, response) => {
            data = null; // GC
            if (err) throw err;
            options.callback(response);
        });
    }

    storeSet(options) {
        if ( typeof options.callback !== 'function' ) {
            throw new Error('Redis store set. Callback is not a function');
        }

        let { key, value } = options;

        this.client.sadd(key, value, (err, response) => {
            if (err) throw err;
            options.callback(response);
        });
    }

    async storePassword(options) {
        let { key } = options;

        try {
            this.keyExists({ key, callback: async (exists) => {
                if (exists) {
                    console.log('Login already exists.');
                    options.callback(2);
                    return false;
                };

                this.storeSet({key: 'login', value: options.data.email, callback: response => {
                    if (response === 0) {
                        console.log('Email already exists.');
                        options.callback(3);
                        return true;
                    }

                    this.storeHash({ key, data: options.data, callback: async (result) => {
                        if (result === 'OK') {
                            console.log('New user set');
                            options.callback(1);
                            return true;
                        }

                        console.log('Store password failed.');
                        options.callback(0);
                        return false;
                    }});

                } });
            }});
        } catch (err) {
            options.callback(0);
            console.error(`Store password failed. ${err.message || err.toString()}`);
            return false;
        }
    }

    async getPassword(options) {
        let { key } = options;

        try {
            this.keyExists({ key, callback: async (exists) => {
                if (!exists) {
                    console.log('Login does not exist.');
                    options.callback(null);
                    return false;
                };

                this.getHash(options);
                return true;

            }});
        } catch (err) {
            throw new Error(`Store password failed. ${err.message || err.toString()}`);
        }
    }

    async getHash(options) {
        let { key, data } = options;

        try {
            this.client.hmget(key, ...data, (err, result) => {
                if (err) throw err;

                options.callback({
                    [data[0]]: result[0],
                    [data[1]]: result[1],
                });

                data = null; // GC
                return true;
            });
        } catch (err) {
            throw err;
        }
    }
};

const _redis = new Redis('redis://h:p3ddd6d1129711b6bbbbba3c37eafe241275a92cd3c0c77891b3678d7c93dca57@ec2-100-24-153-19.compute-1.amazonaws.com:44009');

module.exports = _redis;