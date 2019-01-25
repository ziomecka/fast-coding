const passwordManager = require('./PasswordManager/');

module.exports = async (req, res) => {
    const { login, currentPassword, newPassword } = req.body;

    if ( !login || !currentPassword || !newPassword ) {
        res.json({ error: 'Login and passwords cannot be empty' });
    }

    try {
        res.json({ result: await passwordManager.changePassword({ login, currentPassword, newPassword }) });
    } catch (err) {
        res.json({ error: err.message || err.toString() });
    }
};