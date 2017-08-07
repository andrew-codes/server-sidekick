import React from 'react';
import {Provider} from 'react-redux';
import {StaticRouter} from 'react-router-dom';
import {renderToString} from 'react-dom/server';
import {App} from 'v1-status-web-ui';
import renderFullPage from './../renderFullPage';
import configureStore from './../../configureStore';
import fetch from 'isomorphic-fetch';

export default (req, res) => {
    const context = {};

    fetch('http://hackweek:5000/api/Status/continuum')
        .then(response => response.json())
        .then(data => {
            const initialState = {
                builds: data.item2
                    .reduce((output, item) => ({
                        ...output,
                        [item.instanceId]: item,
                    }), {})
            };
            const store = configureStore(initialState);

            let markup = renderToString(
                <StaticRouter
                    location={req.url}
                    context={context}
                >
                    <Provider store={store}>
                        <App />
                    </Provider>
                </StaticRouter>
            );

            if (context.url) {
                res.redirect(301, context.url);
                return;
            }

            res
                .status(context.status || 200)
                .send(renderFullPage(markup, initialState));
        });
};
