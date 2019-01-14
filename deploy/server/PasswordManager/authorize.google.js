// https://firebase.google.com/docs/reference/rest/auth/
// https://firebase.google.com/docs/reference/rest/auth/#section-refresh-token

require('dotenv').config();
const https = require('https');
const constants = require('../constants');

module.exports = ( refreshToken ) => {
    const { FIREBASE_API_KEY } = process.env;
    const { GOOGLE: { PATH, HOST }} = constants;

    let body = [];

    return new Promise(( resolve, reject ) => {
        const request = https.request({
            method: 'POST',
            hostname: HOST,
            path:`${ PATH }?key=${ FIREBASE_API_KEY }`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }, res => {
            res.on( 'data', chunk => body.push(chunk.toString( 'utf8' ) ) );
            res.on( 'error', err => reject( err ) );
            res.on( 'end', () => {
                if ( res.statusCode === 200 ) {
                    resolve( JSON.parse( body.join('')) );
                    body = null; // GC
                } else {
                    reject( new Error( `Google request response code: ${ res.statusCode }` ) );
                }
            } );
        });

        request.write(`grant_type=refresh_token&refresh_token=${ refreshToken }`);
        request.end();
    });
};
