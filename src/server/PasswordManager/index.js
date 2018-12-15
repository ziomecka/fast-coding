const _crypto = require('crypto');
const redis = require('../Redis/index');

const { ERROR, LOGIN_DOES_NOT_EXIST, SUCCESS, INCORRECT_PASSWORD } = require('../constants').PASSWORD_MANAGER_RESPONSES;

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
};

const passwordManager = new PasswordManager();

module.exports = passwordManager;