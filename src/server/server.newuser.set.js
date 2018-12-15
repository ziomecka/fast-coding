const passwordManager = require('./PasswordManager/');

module.exports = async (req, res) => {
    try {
        const { login, password, email } = req.body;

        if ( !login || ! password || !email ) {
            res.json({ error: 'Login, password and email cannot be empty' });
        }

        passwordManager.setPassword({ login, password, email, callback: response => {
            // TODO
            /** If password set succesfully set cookie */
            // if (response.result === 1) {
            //     res.cookie(
            //         `${HASH_COOKIE_NAME}-${login}`,
            //         response.passwordHash,
            //         { maxAge: HASH_COOKIE_MAX_AGE, httpOnly: true }
            //     )
            // }
            res.json(JSON.stringify(response));
        } });

    } catch (err) {
        res.json({ error: err.message || err.toString() });
    }
};