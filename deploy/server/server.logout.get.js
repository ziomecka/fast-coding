const passwordManager = require('./PasswordManager/');
const {
    VERIFY_PASSWORD: { COOKIE_NAME, AUTHORIZATION_METHOD }} = require('./constants');

module.exports = async ( req, res ) => {
    const { login, authorizationMethod } = req.session;

    if  ( authorizationMethod === AUTHORIZATION_METHOD) {
        let response = await passwordManager.logout({
            login: login,
            token: req.cookies[ COOKIE_NAME ]
        });

        if ( response ) {
            req.session.authorized = false;

            /** Delete cookie */
            res.cookie( COOKIE_NAME, '', {
                expires: new Date(Date.now()),
                httpOnly: true,
                secure,
                domain
            });

            res.json( { result: 1, authorized: false } );
            console.log(`Login: ${ login }, authorized with FC, logged out`);

            response = null; // GC
        }
    } else {
        req.session.authorized = false;
        res.json( { result: 1, authorized: false } );
        console.log(`Login: ${ login }, authorized with firebase, logged out`);
    }
};