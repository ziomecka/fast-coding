require('dotenv').config();
const passwordManager = require('./PasswordManager/');

let {
    DOMAIN: domain,
    VERIFY_PASSWORD: { COOKIE_NAME, HASH_EXPIRES_SECONDS, AUTHORIZATION_METHOD },
    PASSWORD_MANAGER_RESPONSES: { SUCCESS }
} = require('./constants');

let secure = true;

if ( !process.env.NODE_ENV ){
    domain = `localhost`;
    secure = false;
}

module.exports = async (req, res) => {
    const { login, password } = req.body;
    if ( !login || ! password ) {
        res.json( { error: 'Login and password cannot be empty' } );
    }

    try {
        let loginResult = await passwordManager.verifyPassword({ login, password });
        const { result, token } = loginResult;

        if ( result === SUCCESS ) {
            Object.assign( req.session, {
                login,
                authorizationMethod: AUTHORIZATION_METHOD,
                authorized: true
            });

            res.cookie(`${ COOKIE_NAME }`, token, {
                maxAge: HASH_EXPIRES_SECONDS * 1000, // to milliseconds
                httpOnly: true,
                secure,
                domain
            });

            console.log(`Cookie created for: ${ login }, fast-coding authorization `);
            res.json( { result } );

        } else {
            res.json( { result } );
        }

        loginResult = null; // GC
    } catch ( err ) {
        res.json( { error: err.message || err.toString() } );
    }
};