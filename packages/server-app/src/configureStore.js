import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducer';

const isDevelopment = process.env.NODE_ENV !== 'production';

const composeEnhancers = (isDevelopment)
    ? require('redux-devtools-extension').composeWithDevTools
    : compose;

export default function configureStore(initialState = {}) {

    const middleware = [
    ];

    if (isDevelopment) {
        const createLogger = require('redux-logger').createLogger;
        middleware.push(createLogger());
    }

    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(...middleware)),
    );

    if (module.hot) {
        module.hot.accept('./reducer', () => {
            const nextRootReducer = require('./reducer').default;
            store.replaceReducer(nextRootReducer);
        })
    }
    return store;
}
