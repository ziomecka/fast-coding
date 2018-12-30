const collection = 'courses';

module.exports = class MongoDb {
    constructor(options) {
        this.collection = Object(options).collection || collection;
        this.client = require('mongodb').MongoClient;
        this.uri = process.env.MONGODB_URI;
        this.dbName = process.env.DB_NAME;
    }

    async getDb() {
        try {
            return await this.client.connect(this.uri, {
                useNewUrlParser: true
            });
        } catch (err) {
            throw err;
        }
    }

    async createCollection(_options) {
        let { collection = this.collection, options = {} } = Object(_options);

        try {
            let db = await this.getDb();
            let dbo = db.db(this.dbName);
            await dbo.createCollection(collection, options);
            // console.log('Collection created!');
            db.close();
            dbo = null;
            db = null;
        } catch (err) {
            throw err;
        } finally {
            options = null;
        }
    }

    async insertOne(options) {
        let { collection = this.collection, document } = Object(options);

        try {
            let db = await this.getDb();
            let dbo = db.db(this.dbName);

            await dbo.collection(collection).insert(document);

            // console.log('Documents inserted!');

            db.close();
            db = null;
            dbo = null;
        } catch (err) {
            throw err;
        } finally {
            documents = null;
        }
    }

    async insertMany(options) {
        let { collection = this.collection, documents = [] } = Object(options);

        try {
            let db = await this.getDb();
            let dbo = db.db(this.dbName);

            await dbo.collection(collection).insertMany(documents);

            // console.log('Documents inserted!');

            db.close();
            db = null;
            dbo = null;
        } catch (err) {
            throw err;
        } finally {
            documents = null;
        }
    }

    async find(options) {
    // async find(options : MongoDbFindI) {
        let { collection = this.collection, query = {} } = Object(options);

        try {
            let db = await this.getDb();
            let dbo = db.db(this.dbName);
            let result = await dbo.collection(collection).find(query).toArray();

            db.close();
            db = null;
            dbo = null;

            return result;
        } catch (err) {
            throw err;
        } finally {
            query = null;
        }
    }
};

// export interface MongoDbFindI {
//     collection: string;
//     query: any;
// }