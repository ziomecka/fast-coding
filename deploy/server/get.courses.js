// @ts-ignore
let Mongo = require('./Mongo/index.js');

module.exports = async function(login) {
    try {
        const types = [ 'free' ];

        const courses = await new Mongo({collection: 'courses'}).find({
            type: { $in: types }
        });

        return courses.reduce((acc, cv) => {
            acc.push(cv);
            return acc;
        }, []);
    } catch (err) {
        throw err;
    }
};
