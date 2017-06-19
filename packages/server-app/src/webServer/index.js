import express from 'express';
import appServer from './app';
import {isProduction, port} from './../env';

let app = express();
app = appServer(app);

if (!isProduction) {
    const webpack = require('webpack');
    const webpackConfig = require('./../../../../build/webpack/development.web');
    const compiler = webpack(webpackConfig);
    app.use(require('webpack-dev-middleware')(compiler, {
        hot: true,
        stats: {
            colors: true,
        },
    }));
    app.use(require('webpack-hot-middleware')(compiler));
}

app.listen(port, () => {
    console.log('App listening on port 3000!');
});
