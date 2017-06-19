const path = require('path');
const webpack = require('webpack');
const baseWebpackConfig = require('./base');
const externals = require('./externals');

const pkg = require(path.join(process.cwd(), 'package.json'));

const developmentConfig = Object.assign({}, baseWebpackConfig, {
    cache: true,
    devtool: 'cheap-module-eval-source-map',
});
// developmentConfig.externals = [
//     externals,
// ];
developmentConfig.entry = {
    [pkg['webpack/web/output']]: [
        'webpack-hot-middleware/client?reload=true',
        'react-hot-loader/patch',
        `./${pkg['webpack/web/entry']}`,
    ]
};
developmentConfig.output.publicPath = '';
developmentConfig.output.path = path.join(developmentConfig.output.path, 'client');
developmentConfig.output.libraryTarget = 'umd';
developmentConfig.resolve.modules = [
    path.resolve(process.cwd(), 'node_modules'),
    path.resolve(__dirname, '..', '..', 'node_modules'),
];
developmentConfig.resolve.plugins.push(new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify('development'),
        BROWSER: JSON.stringify(true),
    },
}));
developmentConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = developmentConfig;
