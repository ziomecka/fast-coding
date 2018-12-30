const passwordManager = require('./PasswordManager/');

module.exports = async (req, res) => {
    const { login, password } = req.body;

    if ( !login || ! password ) {
        res.json({ error: 'Login and password cannot be empty' });
    }

    try {
        res.json({ result: await passwordManager.verifyPassword({ login, password }) });
    } catch (err) {
        res.json({ error: err.message || err.toString() });
    }
};