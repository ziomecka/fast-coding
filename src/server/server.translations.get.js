module.exports = async (req, res) => {
    const { body: { id = 'privacyPolicy' } } = req;
    try {
        res.json({
            result: 1,
            translations: await require('./get.translations')( id )
        });
    } catch (err) {
        res.json({ error: err.message || err.toString() });
    }
};