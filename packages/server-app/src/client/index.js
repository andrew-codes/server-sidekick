import React from 'react';
import {AppContainer} from 'react-hot-loader';
import {BrowserRouter} from 'react-router-dom';
import {render} from 'react-dom';
import {App} from 'v1-status-web-ui';

const renderApp = () => {
    render((
        <AppContainer>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AppContainer>
    ), document.getElementById('root'));
};

renderApp();

if (module.hot) {
    module.hot.accept(() => {
        renderApp();
    });
}
