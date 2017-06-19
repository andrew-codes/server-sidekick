import React from 'react';
import {AppContainer} from 'react-hot-loader';
import {render} from 'react-dom';
import {HelloWorld} from 'v1-status-web-ui';

render((
    <AppContainer>
        <HelloWorld />
    </AppContainer>
), document.getElementById('root'));

if (module.hot) {
    module.hot.accept(() => {
        render((
            <AppContainer>
                <HelloWorld />
            </AppContainer>
        ), document.getElementById('root'));
    });
}
