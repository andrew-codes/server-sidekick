import unless from 'express-unless';
import loggerWare from './middlewares/loggerWare';
import reactPagesWare from './middlewares/reactPagesWare';

export default (server) => {
    server.use(loggerWare);
    reactPagesWare.unless = unless;
    server.use(reactPagesWare.unless({
        path: [
            '/dist/client/index.js',
            '/__webpack_hmr'
        ],
    }));
    return server;
}
