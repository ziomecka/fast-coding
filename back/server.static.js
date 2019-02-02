require('dotenv').config();
const express = require('express');
const path = require('path');

module.exports = () => {
    const STATIC_PATH = process.env.NODE_ENV
        ? path.resolve( __dirname, '../_deploy/' )
        : path.resolve( __dirname, '../_bundleFront/' );

    return express.static( STATIC_PATH, {
        setHeaders: ( res, path ) => {
            res.set('Access-Control-Allow-Headers', 'cache-control');
            res.set('Access-Control-Allow-Headers', 'cache-control');

            if (RegExp(/(.*npm\..*)|(.*vendor.*)/).test( path )) {
                res.set("Cache-Control", "public, max-age=31536000");
            } else {
                res.set("Cache-Control", "public, max-age=0");
            }
        }
    });
};