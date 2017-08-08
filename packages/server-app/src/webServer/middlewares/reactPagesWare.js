import createGenerateClassName from 'material-ui/styles/createGenerateClassName';
import createPalette from 'material-ui/styles/palette';
import preset from 'jss-preset-default';
import React from 'react';
import {App} from 'v1-status-web-ui';
import {create} from 'jss';
import {createMuiTheme, MuiThemeProvider} from 'material-ui/styles';
import {green, red} from 'material-ui/colors';
import {JssProvider, SheetsRegistry} from 'react-jss'
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import renderFullPage from './../renderFullPage';
import configureStore from './../../configureStore';
import {getBuildsSeedState} from 'v1-status-js-api';

export default (req, res) => {
    const context = {};
    const sheetsRegistry = new SheetsRegistry();

    const theme = createMuiTheme({
        palette: createPalette({
            accent: red,
            error: red,
            primary: green,
            type: 'light',
        }),
    });
    // Configure JSS
    const jss = create(preset());
    jss.options.createGenerateClassName = createGenerateClassName;

    getBuildsSeedState()
        .then(builds => {
            const initialState = {
                ...builds,
            };

            const store = configureStore(initialState);

            let html = renderToString(
                <StaticRouter
                    location={req.url}
                    context={context}
                >
                    <Provider store={store}>
                        <JssProvider registry={sheetsRegistry} jss={jss}>
                            <MuiThemeProvider theme={theme} sheetsManager={new WeakMap()}>
                                <App />
                            </MuiThemeProvider>
                        </JssProvider>
                    </Provider>
                </StaticRouter>
            );

            if (context.url) {
                res.redirect(301, context.url);
                return;
            }

            const css = sheetsRegistry.toString();
            res
                .status(context.status || 200)
                .send(renderFullPage({html, css}, initialState));
        });
};
