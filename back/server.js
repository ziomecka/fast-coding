require('mime');
require('./Redis/');

const express = require('express');
const app = express();
const http = require('http');
const server = http.Server(app);
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const constants = require('./constants');
const getSession = require('./server.session');

const serverCors = require('./server.cors');
const serverStatic = require('./server.static');

const router = require('./router');

const {
    PORT: _PORT,
    SESSION: { ROUTES }
} = constants;

const { NODE_ENV, HMR } = process.env;

const PORT = NODE_ENV
    ? process.env.PORT
    : _PORT;

app.use( helmet() );

app.set('trust proxy', 1);

/** Turn on hot module replacement. */
if ( !NODE_ENV && HMR ) {
    require('./server.hmr')();
}

app.use( serverCors() );
app.use( express.json() );
app.use( express.urlencoded({ extended: false }) );
app.use( cookieParser() );
app.use( ROUTES, getSession() );

app.use ( '/', router );
app.use( serverStatic() );

server.listen(PORT, console.log(`Listening on ${ PORT }`));

