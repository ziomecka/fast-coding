const fs = require('fs');
const path = require('path');
const favicon = fs.readFileSync( path.resolve( __dirname, './_public/images/favicon.ico') );

module.exports = ( req, res ) => {
    res.setHeader( 'Content-Length', favicon.length );
    res.setHeader ( 'Content-Type', 'image/x-icon' );
    res.end( favicon );
};