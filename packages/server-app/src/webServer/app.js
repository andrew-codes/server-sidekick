import loggerWare from './middlewares/loggerWare';
import reactPagesWare from './middlewares/reactPagesWare';

export default (server) => {
    server.use(loggerWare);
    server.use(reactPagesWare);
    return server;
}
