import {compose} from 'redux';
import {createLogger} from 'redux-logger';
import {configureStore} from 'v1-status-state-modules';

const isDevelopment = process.env.NODE_ENV !== 'production';

const composeEnhancers = (isDevelopment)
    ? require('redux-devtools-extension').composeWithDevTools
    : compose;

export default function(initialState = {}) {

    const middleware = [
      createLogger(),
    ];
    return configureStore(initialState, middleware, composeEnhancers);
}
