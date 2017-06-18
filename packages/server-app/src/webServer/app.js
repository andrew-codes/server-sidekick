import {HelloWorld} from '@rdhariwal/fpm-web';
import {renderToString} from 'react-dom/server';

export default (server) => {
    server.get('*', (req, res) => {
       res.status(200).send(renderToString(HelloWorld()));
    });
    return server;
}
