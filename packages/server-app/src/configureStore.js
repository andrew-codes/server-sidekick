import createSagaMiddleware, {END} from 'redux-saga';
import {createStore, applyMiddleware, compose} from 'redux';
import {sagas} from 'v1-status-state-modules';
import rootReducer from './reducer';

const isDevelopment = process.env.NODE_ENV !== 'production';

const composeEnhancers = (isDevelopment)
    ? require('redux-devtools-extension').composeWithDevTools
    : compose;

export default function configureStore(initialState = {}) {
    const sagaMiddleware = createSagaMiddleware();
    const websocketMiddleware = createSagaMiddleware();

    const middleware = [
        sagaMiddleware,
        websocketMiddleware,
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
    websocketMiddleware.run(sagas.websocket('ws://localhost:5000/ws'));
    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);
    return store;
}
