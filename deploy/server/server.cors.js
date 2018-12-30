require('dotenv').config();

const cors = require('cors');
const CORS = require('./constants').CORS;

const { localhost, exposedHeaders } = CORS;

module.exports = () => {
    const whitelist = [ localhost ];

    const corsOptions = {
        exposedHeaders,
        credentials: true,
        origin: (origin, callback) => {
            if ( !origin || whitelist.indexOf(origin) !== -1 ) {
                callback(null, true);
            } else {
                callback(console.warn('Not allowed by CORS'), false);
            }
        }
    };

    return cors(corsOptions);
};
