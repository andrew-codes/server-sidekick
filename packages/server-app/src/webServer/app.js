import {HelloWorld} from 'v1-status-web-ui';
import {renderToString} from 'react-dom/server';
import renderHtml from './renderHtml';

export default (server) => {
    server.get('/', (req, res) => {
       res.status(200).send(renderHtml({body: renderToString(HelloWorld())}));
    });
    return server;
}
