import createPalette from 'material-ui/styles/palette';
import React from 'react';
import {App} from 'v1-status-web-ui';
import {AppContainer} from 'react-hot-loader';
import {BrowserRouter} from 'react-router-dom';
import {createMuiTheme, MuiThemeProvider} from 'material-ui/styles';
import {green, red} from 'material-ui/colors';
import {Provider} from 'react-redux';
import {hydrate} from 'react-dom';
import configureStore from '../configureStore';

const renderApp = (store) => {
    const theme = createMuiTheme({
        palette: createPalette({
            accent: red,
            error: red,
            primary: green,
            type: 'light',
        }),
    });

    hydrate((
        <AppContainer>
            <Provider store={store}>
                <BrowserRouter>
                    <MuiThemeProvider theme={theme}>
                        <App />
                    </MuiThemeProvider>
                </BrowserRouter>
            </Provider>
        </AppContainer>
    ), document.getElementById('root'));
};

const store = configureStore(window.__PRELOADED_STATE__ || {});
renderApp(store);

if (module.hot) {
    module.hot.accept(() => {
        renderApp(store);
    });
}
