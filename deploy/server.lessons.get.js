module.exports = async (req, res, next) => {
    try {
        let data = await require('./get.courses')();
        res.json({ result: 1, lessons: data });
        data = null; // GC
    } catch (err) {
        res.json({ error: err.message || err.toString() });
    }
};