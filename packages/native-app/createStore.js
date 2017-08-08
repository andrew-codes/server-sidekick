import {compose} from 'redux';
import {createLogger} from 'redux-logger';
import {configureStore} from 'v1-status-state-modules';

export default function(initialState = {}) {
    const middleware = [
        createLogger(),
    ];
    return configureStore(initialState, middleware, compose);
}
