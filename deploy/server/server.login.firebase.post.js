const redis = require('./Redis/');

const {
    REDIS_RESPONSES: {
        SUCCESS,
        ERROR,
    },
} = require('../constants');


module.exports = async (req, res) => {
    const { email, displayName, authorizationMethod, refreshToken } = req.body;

    if ( !email || !displayName || !authorizationMethod || !refreshToken ) {
        res.json( { error: 'Email, displayName, authorizationMethod and refreshToken cannot be empty' } );
    }

    try {
        let answer = await redis.storeFirebaseUser({ email });
        const { login, result, err } = answer;

        if ( result === SUCCESS ) {
            Object.assign( req.session, { email, displayName, authorizationMethod, refreshToken, login });
            res.json( { result, login } );
        }

        if ( result === ERROR ) {
            res.json( { error: err.message || err.toString() } );
        }

        answer = null;
    } catch ( err ) {
        res.json({ error: err.message || err.toString() });
    }
};