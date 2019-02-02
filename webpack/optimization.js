module.exports = {
    minimize: true,
    splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendor',
                chunks: 'all'
                // name(module) {
                //     const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                //     return `npm.${ packageName.replace('@', '') }`;
                // }
            }
        }
    }
};