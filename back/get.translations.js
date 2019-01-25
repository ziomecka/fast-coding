// @ts-ignore
let Mongo = require('./Mongo/index.js');

module.exports = async function(id) {
    try {
        return await new Mongo({ collection: 'translations' }).find({ id: { $in:  id } });

    } catch (err) {
        throw err;
    }
};
