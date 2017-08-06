import React from 'react';
import {StaticRouter} from 'react-router-dom';
import {renderToString} from 'react-dom/server';
import {App} from 'v1-status-web-ui';
import renderFullPage from './../renderFullPage';

export default (req, res) => {
    const context = {};

    let markup = renderToString(
        <StaticRouter
            location={req.url}
            context={context}
        >
            <App />
        </StaticRouter>
    );

    if (context.url) {
        res.redirect(301, context.url);
        return;
    }

    res
        .status(context.status || 200)
        .send(renderFullPage(markup, {}));
};
