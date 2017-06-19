const glob = require('glob');
const path = require('path');
const webpack = require('webpack');

const pkg = require(path.join(process.cwd(), 'package.json'));

const webpackConfig = {
    entry: {
        [pkg['webpack/output']]: [
            `./${pkg['webpack/entry']}`,
        ],
    },
    output: {
        path: path.join(process.cwd()),
        filename: '[name]',
        libraryTarget: 'commonjs2',
    },
    resolve: {
        extensions: [
            '.js',
        ],
        plugins: [],
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                loader: 'json-loader',
            },
            {
                test: /\.png$/,
                loader: 'url-loader',
            },
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [],
};

module.exports = webpackConfig;
