const authorizeGoogle = require('./PasswordManager/authorize.google');

module.exports = async ( req, res ) => {
    const {
        login,
        authorizationMethod,
        displayName,
        refreshToken,
        authorized,
        email
    } = Object( req.session );

    if ( authorizationMethod === 'GOOGLE' ) {
        try {
            let answer = await authorizeGoogle( refreshToken );

            console.log(`Email: ${ email }, login: ${ login } authorized with Google`);

            const { refreshToken: newRefreshToken } = Object( answer.data );

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