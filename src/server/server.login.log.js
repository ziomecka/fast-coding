const passwordManager = require('./PasswordManager/');

module.exports = async (req, res) => {
    try {
        const { login, password } = req.body;

        if ( !login || ! password ) {
            res.json({ error: 'Login and password cannot be empty' });
        }

        passwordManager.verifyPassword({ login, password, callback: response => {
            /** If password set succesfully set cookie */
            res.json(JSON.stringify(response));
        } });

    } catch (err) {
        res.json({ error: err.message || err.toString() });
    }
};