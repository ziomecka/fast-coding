require('dotenv').config();

module.exports = ( req, res, next ) => {
    if ( process.env.NODE_ENV ) {
        req.url = req.url + '.gz';
        res.set( 'Content-Encoding', 'gzip' );
    }
    res.set( 'Content-Type', 'text/javascript' );
    next();
};