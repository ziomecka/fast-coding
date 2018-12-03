require('mime');

const path = require('path');
const express = require('express');
const app = express();
const http = require('http');
const server = http.Server(app);

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
    cacheControl: true, setHeaders: (res, path, next) => {
        if (RegExp(/.*vendor.chunkhash.*/).test(path)) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 'cache-control');
            res.setHeader("Cache-Control", "public, max-age=0"); //31536000
        }
        res.setHeader("Cache-Control", "public, max-age=0"); //31536000
        next();
}}));

app.get('/lessons/get', async (req, res, next) => {
    try {
        let data = await require('./get.courses')();
        res.json(data);
        data = null; // GC
    } catch (err) {
        res.json({ error: err.message || err.toString() });
    }
});

// app.get('/vendor.chunkhash.bundle.js', (req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'cache-control');
//     res.setHeader("Cache-Control", "public, max-age=31536000");
//     next();
// });


app.get('*', (req, res) => {
    return res.sendFile(HTML_PATH, { root: ROOT });
});

server.listen(PORT, console.log(`Listening on ${PORT}`));