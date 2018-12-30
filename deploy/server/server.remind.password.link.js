const passwordManager = require('./PasswordManager/');

module.exports = async (req, res) => {
    const { email } = req.body;

    if ( !email ) {
        res.json({ error: 'Email cannot be empty' });
    }

    try {
        res.json({ result: await passwordManager.setNewPassword({ email }) });
    } catch (err) {
        res.json({ error: err.message || err.toString() });
    }
};