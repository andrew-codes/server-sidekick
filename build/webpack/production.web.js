const path = require('path');
const webpack = require('webpack');
const baseWebpackConfig = require('./base');
const externals = require('./externals');

const pkg = require(path.join(process.cwd(), 'package.json'));

const productionConfig = Object.assign({}, baseWebpackConfig);
productionConfig.externals = [
    externals,
];
productionConfig.entry = {
    [pkg['webpack/web/output']]: [
        pkg['webpack/web/entry'],
    ]
};
productionConfig.output = {
    path: path.join(process.cwd()),
    filename: '[name]',
    libraryTarget: 'umd',
};
productionConfig.resolve.plugins.push(new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify('production'),
        BROWSER: JSON.stringify(true),
    },
}));
productionConfig.resolve.plugins.push(new webpack.optimize.DedupePlugin());

module.exports = productionConfig;
