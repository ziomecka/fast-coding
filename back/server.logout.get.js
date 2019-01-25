require('dotenv').config();
const passwordManager = require('./PasswordManager/');
let {
    DOMAIN: domain,
    VERIFY_PASSWORD: { COOKIE_NAME, AUTHORIZATION_METHOD }} = require('./constants');

let secure = true;

if ( !process.env.NODE_ENV ){
    domain = `localhost`;
    secure = false;
}

module.exports = async ( req, res ) => {
    const { login, authorizationMethod } = req.session;

    if  ( authorizationMethod === AUTHORIZATION_METHOD ) {
        try {
            let response = await passwordManager.logout({
                login: login,
                token: req.cookies[ COOKIE_NAME ]
            });

            if ( response ) {
                req.session.authorized = false;

                /** Delete cookie */
                res.cookie( COOKIE_NAME, '', {
                    maxAge: 1,
                    httpOnly: true,
                    secure,
                    domain
                });

                res.json( { result: 1, authorized: false } );
                console.log(`Login: ${ login }, authorized with FC, logged out`);

                response = null; // GC
            } else {
                res.json( { result: 0, error: 'Not logged out' });
                console.log(`Login: ${ login }, authorized with FC, not logged out. Error: ${ error }`);

            }
        } catch ( err ) {
            const error = err.message || err.toString();
            res.json( { result: 0, error });
            console.log(`Login: ${ login }, authorized with FC, not logged out. Error: ${ error }`);
        }
    } else {
        req.session.authorized = false;
        res.json( { result: 1, authorized: false } );
        console.log(`Login: ${ login }, authorized with firebase, logged out`);
    }
};