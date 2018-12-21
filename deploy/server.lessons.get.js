module.exports = async (req, res, next) => {
    try {
        res.json({
            result: 1,
            lessons: await require('./get.courses')()
        });
    } catch (err) {
        res.json({ error: err.message || err.toString() });
    }
};