const passwordManager = require('./PasswordManager/');
const {
    REMIND_PASSWORD: {  QUERY_PARAM_KEY, QUERY_PARAM_EMAIL }
} = require('./constants');

module.exports = async (req, res) => {
    const { body: { newPassword } } = req;

    try {
        res.json({
            result: await passwordManager.setNewPassword({
                email: req.query[ QUERY_PARAM_EMAIL ],
                key: req.query[ QUERY_PARAM_KEY ],
                newPassword
            })
        });
    } catch (err) {
        res.json({ error: err.message || err.toString() });
    }
};