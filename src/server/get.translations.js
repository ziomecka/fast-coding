// @ts-ignore
let Mongo = require('./Mongo/index.js');

module.exports = async function(id) {
    try {
        let data = await new Mongo({ collection: 'translations' }).find({ id });
        return Array.isArray(data) ? data[0] : null;

    } catch (err) {
        throw err;
    }
};
