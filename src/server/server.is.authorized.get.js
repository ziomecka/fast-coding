const authorizeGoogle = require('./PasswordManager/authorize.google');
const {
    FIREBASE: { AUTHORIZATION_METHODS },
    VERIFY_PASSWORD: { AUTHORIZATION_METHOD, COOKIE_NAME }
} = require('./constants');

const passwordManager = require('./PasswordManager/');

module.exports = async ( req, res ) => {
    const {
        login,
        authorizationMethod,
        displayName,
        refreshToken,
        authorized,
        email
    } = Object( req.session );

    /** Confirm authorization only if already authorized */
    if ( authorized && AUTHORIZATION_METHODS.indexOf( authorizationMethod ) !== -1 ) {
        try {
            let answer = await authorizeGoogle( refreshToken );

            console.log(`Email: ${ email }, login: ${ login } authorized with Google`);

            const { refresh_token: newRefreshToken } = Object( answer.data || answer );

            Object.assign( req.session, { refreshToken: newRefreshToken });

            res.json({ authorized: true, login, displayName });
            answer = null; // GC
        } catch (err) {
            res.json({ authorized: false });
            console.log(`Https request to Google: ${ err.message || err.toString() }`);
        }
    } else if ( authorized && authorizationMethod === AUTHORIZATION_METHOD ) {
        try {
            const isAuthorized = await passwordManager.verifyUser({ token: req.cookie[ COOKIE_NAME ], login });

            if ( isAuthorized ) {
                res.json({ authorized: true, login, displayName });
                console.log(`User: ${ login } authorized with FC`);
            } else {
                res.json({ authorized: false });
                console.log(`User: ${ login } not authorized by FC`);
            }
        } catch ( err ) {
            res.json({ authorized: false });
            console.log(`Authorized by FC error: ${ err.message || err.toString() }`);
        }

    } else {
        res.json({ authorized: false });
    }
};