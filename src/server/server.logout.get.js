const passwordManager = require('./PasswordManager/');
const {
    VERIFY_PASSWORD: { COOKIE_NAME }} = require('./constants');

module.exports = async ( req, res ) => {
    let response = await passwordManager.logout({
        login: req.session.login,
        token: req.cookies[ COOKIE_NAME ]
    });

    if ( response ) {
        const { login } = req.session;

        req.session.authorized = false;

        /** Delete cookie */
        res.cookie( COOKIE_NAME, '', {
            expires: new Date(Date.now()),
            httpOnly: true,
            secure,
            domain
        });

        res.json( { result: 1, authorized: false } );
        console.log(`Login: ${ login } logged out`);

        response = null; // GC
    }
};