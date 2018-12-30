module.exports = {
    all: false,
    assets: true,
    assetsSort: 'size',
    chunksSort: 'name',
    errors: true,
    performance: true,
    warnings: true,
    excludeAssets: (assetName) => (/(.*server\/.*)|(^npm\..*)/).test(assetName)
};