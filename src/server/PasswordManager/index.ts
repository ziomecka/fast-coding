const _crypto = require('crypto');
const Redis = require('../Redis/index');

type Salt = string;

type PasswordDB = {
    salt: string;
    passwordHash: string;
};

module.exports = class PasswordManager {
    _password: string;
    // _redis: Redis;
    constructor(password: string) {
        this._password = password;
        // this._redis;
    }

    // get redis() {
    //     this._redis = new Redis();
    //     return this._redis;
    // }

    // storePassword() {
    //     this._redis
    // }

    // _getSalt(length: number = 50): string {
    //     return _crypto.randomBytes(length);
    // }

    // _sha512(password: string, salt: string): PasswordDB {
    //     let hash = _crypto.createHmac('sha512', salt);

    //     return {
    //         salt,
    //         passwordHash: hash.update(password).digest('hex')
    //     };
    // }

    // encrypt(): PasswordDB {
    //     return {
    //         ...this._sha512(this._password, this._getSalt())
    //     };
    // }

};