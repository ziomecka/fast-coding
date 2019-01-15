const passwordManager = require('./PasswordManager/');

module.exports = async (req, res) => {
    const { login, password } = req.body;

    if ( !login || ! password ) {
        res.json( { error: 'Login and password cannot be empty' } );
    }

    try {
        let loginResult = await passwordManager.verifyPassword({ login, password });
        const { result, login } = Object( loginResult );

        if ( !!result ) {
            // TODO remove magic number
            Object.assign( req.session, { login, authorizationMethod: 'FAST_CODING', authorized: true });
            req.session.save();
            res.json( { result: loginResult } );
        } else {
            res.json( { result: loginResult } );
        }

        loginResult = null; // GC
    } catch ( err ) {
        res.json( { error: err.message || err.toString() } );
    }
};