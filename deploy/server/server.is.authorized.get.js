const authorizeGoogle = require('./PasswordManager/authorize.google');
const { FIREBASE: { AUTHORIZATION_METHODS }} = require('./constants');

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
    } else {
        res.json({
            authorized,
            login,
            displayName
        });
    }
};