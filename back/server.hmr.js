module.exports = ( app ) => {
    const path = require('path');
    const webpack = require('webpack');

    const webpackConfig = require( path.resolve( ROOT, '../webpack/webpack.bundle' ) );
    const compiler = webpack( webpackConfig );

    app.use(require( 'webpack-dev-middleware' )( compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath,
    } ) );

    app.use( require('webpack-hot-middleware')( compiler ) );
};