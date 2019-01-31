require('dotenv').config();
const express = require('express');
const path = require('path');

module.exports = () => {
    const ROOT = path.resolve(__dirname, './');

    const STATIC_PATH = process.env.NODE_ENV
        ? '../_deploy/'
        : '../_bundleFront/';

    express.static( path.resolve( ROOT, STATIC_PATH ), {
        setHeaders: (res, path) => {
            res.set('Access-Control-Allow-Headers', 'cache-control');

            if (RegExp(/(.*npm\..*)|(.*vendor.*)/).test(path)) {
                res.set("Cache-Control", "public, max-age=31536000");
            } else {
                res.set("Cache-Control", "public, max-age=0");
            }
        }
    });
};