const _crypto = require('crypto');
const redis = require('../Redis/index');

class PasswordManager {
    constructor(options = {}) {
        this.saltSize = options.saltSize || 50;

        this._redis = redis;
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

    async setPassword(options) {
        let { login, password, email, callback } = options;

        if ( !login || ! password ) {
            throw new Error('Login and password must be a non-empty string');
        }

        if ( typeof callback !== 'function' ) {
            throw new Error('Callback is not a fuction');
        }

        const { passwordHash, salt } = this._encrypt(password, this._getSalt());

        this.redis.storePassword({ key: login, data: { passwordHash, salt, email }, callback: result => {
            try {
                if ( result === 1 ) {
                    callback({ result, passwordHash });
                    callback = null; // GC
                    return true;
                }
                callback({ result });
                callback = null; // GC
                return false;

            } catch (err) {
                options.callback({ result: 0 });
                console.error(`Set password error: ${err.message || err.toString()}`);
            }
        } });

    }

    async verifyPassword(options) {
        const { login, password } = options;

        this.redis.getPassword({ key: login, data: ['salt', 'passwordHash'], callback: response => {
            try {
                if (!response) {
                    options.callback({ result: 2 });
                    return false;
                }
                const { passwordHash: storedPasswordHash, salt: storedSalt } = response;
                const { passwordHash } = this._encrypt(password, storedSalt);

                const passwordValid = storedPasswordHash === passwordHash;

                options.callback({ result: Number(passwordValid) });
                return passwordValid;
            } catch (err) {
                options.callback({ result: 3 });
                console.error(`Verify password error: ${err.message || err.toString()}`);
            }
        }});
    }
};

const passwordManager = new PasswordManager();

module.exports = passwordManager;