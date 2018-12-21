require('dotenv').config();

const cors = require('cors');
const CORS = require('./constants').CORS;

const { localhost, production, exposedHeaders } = CORS;

<<<<<<< HEAD
module.exports = (prod) => {
    const whitelist = !prod
        ? [ localhost ]
        : [ production ];

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
=======
const whitelist = !PROD_ENV
    ? [ localhost ]
    : [ production ];

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

module.exports = () => cors(corsOptions);
>>>>>>> develop
