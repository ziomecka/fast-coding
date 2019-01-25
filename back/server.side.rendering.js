const { template } = require('./ssr/');

module.exports = ( req, res ) => {
    res.send( template() );
}