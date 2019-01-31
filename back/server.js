require('mime');
require('./Redis/');

const path = require('path');
const express = require('express');
const app = express();
const http = require('http');
const server = http.Server(app);
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const constants = require('./constants');
const getSession = require('./server.session');

const serverCors = require('./server.cors');

const router = require('./router');

const {
    PORT: _PORT,
    SESSION: { ROUTES }
} = constants;

const PROD_ENV = process && process.env.NODE_ENV? process.env.NODE_ENV.trim() === 'production' : false;

const PORT = !PROD_ENV ? _PORT : process.env.PORT;

const ROOT = path.resolve(__dirname, './');

app.use( helmet() );

/** Turn on hot module replacement. */
if (!PROD_ENV) {
    const webpack = require('webpack');
    const webpackPath = path.resolve(ROOT, '../webpack/webpack.bundle');
    const webpackConfig = require(webpackPath);
    const compiler = webpack(webpackConfig);

    app.use(
        require('webpack-dev-middleware')(compiler, {
            noInfo: true,
            publicPath: webpackConfig.output.publicPath,
        })
    );

    app.use(require('webpack-hot-middleware')(compiler));
}

app.set('trust proxy', 1);

app.use(express.static( path.resolve( ROOT, '../_deploy/' ), {
    setHeaders: (res, path) => {
        res.set('Access-Control-Allow-Headers', 'cache-control');

        if (RegExp(/(.*npm\..*)|(.*vendor.*)/).test(path)) {
            res.set("Cache-Control", "public, max-age=31536000");
        } else {
            res.set("Cache-Control", "public, max-age=0");
        }
    }
}));

app.use( serverCors() );

app.use( express.json() );
app.use( express.urlencoded({ extended: false }) );
app.use( cookieParser() );
app.use( ROUTES, getSession() );

app.use ( '/', router );

server.listen(PORT, console.log(`Listening on ${ PORT }`));

