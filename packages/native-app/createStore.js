import {compose} from 'redux';
import {configureStore} from 'v1-status-state-modules';

export default function(initialState = {}) {
    const middleware = [];
    return configureStore(initialState, middleware, compose);
}
