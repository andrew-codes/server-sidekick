const webpack = require('webpack');
const baseWebpackConfig = require('./base');
const externals = require('./externals');

const productionConfig = Object.assign({}, baseWebpackConfig);
productionConfig.externals = [
    externals,
];
productionConfig.resolve.plugins.push(new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify('production'),
    },
}));
productionConfig.resolve.plugins.push(new webpack.optimize.DedupePlugin());

module.exports = productionConfig;
