require('mime');
require('./Redis/');

const path = require('path');
const express = require('express');
const app = express();
const http = require('http');
const server = http.Server(app);
const serverNewUserSet = require('./server.newuser.set');
const serverLoginLog = require('./server.login.log');
const serverLessonsGet = require('./server.lessons.get');

const { PORT: _PORT } = constants;

const PROD_ENV = process && process.env.NODE_ENV? process.env.NODE_ENV.trim() === 'production' : false;
const PORT = !PROD_ENV ? require('./constants').PORT : process.env.PORT;
const ROOT = !PROD_ENV ? path.join(__dirname, '/') : __dirname;
const HTML_PATH = !PROD_ENV
    ? path.resolve(__dirname, '/')
    : path.resolve(__dirname, '../../../index.html');

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

app.use(express.static(ROOT, {
    setHeaders: (res, path) => {
        if (RegExp(/.*vendor.chunkhash.*/).test(path)) {
            res.set('Access-Control-Allow-Origin', '*');
            res.set('Access-Control-Allow-Headers', 'cache-control');
            res.set("Cache-Control", "public, max-age=31536000");
        } else {
            res.set("Cache-Control", "public, max-age=0");
        }
}}));

app.use( express.json() );
app.use( express.urlencoded({ extended: false }) );
/** Get lessons */
app.get( '/lessons/get', serverLessonsGet );

/** Set newuser */
app.post( '/newuser/set', serverNewUserSet );

/** Log user */
app.post( '/login/log', serverLoginLog );

app.get('*', (req, res) => {
    return res.sendFile(HTML_PATH, { root: ROOT });
});

server.listen(PORT, console.log(`Listening on ${PORT}`));