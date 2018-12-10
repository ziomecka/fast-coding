const _Redis = require('ioredis');

module.exports = class Redis {
    private _client: any;
    private _uri: any;
    // client: any;
    constructor(props) {
        this._client;
        this._uri = process.env.REDIS_URI;
    }

    get client() {
        this._client = new _Redis(this._uri);
        return this._client;
    }

    store(data) {

    }

};