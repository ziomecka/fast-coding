const passwordManager = require('./PasswordManager/');

let {
    PASSWORD_MANAGER_RESPONSES: { SUCCESS }
} = require('./constants');
module.exports = async (req, res) => {
    const { login, password } = req.body;
    if ( !login || ! password ) {
        res.json( { error: 'Login and password cannot be empty' } );
    }

    try {
        let loginResult = await passwordManager.verifyPassword({ login, password });
        const { result, token } = loginResult;

        if ( result === SUCCESS ) {
            res.json( { result } );

            // TODO remove magic number
            Object.assign( req.session, { login, authorizationMethod: 'FAST_CODING', authorized: true });
        } else {
            res.json( { result } );
        }

        loginResult = null; // GC
    } catch ( err ) {
        res.json( { error: err.message || err.toString() } );
    }
};