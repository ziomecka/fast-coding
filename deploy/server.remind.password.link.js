const passwordManager = require('./PasswordManager/');

module.exports = async (req, res) => {
    const { email } = req.body;

    if ( !email ) {
        res.json({ error: 'Email cannot be empty' });
    }

    try {
        // TODO pass link
        res.json({ result: await passwordManager.validatePasswordRemindLink({ email }) });
    } catch (err) {
        res.json({ error: err.message || err.toString() });
    }
};