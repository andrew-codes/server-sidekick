import React from 'react';
import {Provider} from 'react-redux';
import {StaticRouter} from 'react-router-dom';
import {renderToString} from 'react-dom/server';
import {App} from 'v1-status-web-ui';
import renderFullPage from './../renderFullPage';
import configureStore from './../../configureStore';
import {getBuildsSeedState} from 'v1-status-js-api';

export default (req, res) => {
    const context = {};

    getBuildsSeedState()
        .then(builds => {
            const initialState = {
                ...builds,
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
