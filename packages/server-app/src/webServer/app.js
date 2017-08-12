import express from 'express';
import path from 'path';
import unless from 'express-unless';
import url from 'url';
import loggerWare from './middlewares/loggerWare';
import reactPagesWare from './middlewares/reactPagesWare';

export default (server) => {
    server.use(loggerWare);
    server.use('/static', express.static(path.join(__dirname, '..', 'public')));
    reactPagesWare.unless = unless;
    server.use(reactPagesWare.unless((req) => {
        const pathname = url.parse(req.originalUrl).pathname;
        if (pathname.indexOf('__webpack_hmr') >= 0) {
            return true;
        }
        const extensionsToIgnore = [
            'jpg',
            'css',
            'png',
            'js',
            'ico',
            'json',
        ];
        const ignoreExpression = new RegExp(`.*\\.(${extensionsToIgnore.join('|')})`);
        return pathname.match(ignoreExpression);
    }));
    return server;
}
