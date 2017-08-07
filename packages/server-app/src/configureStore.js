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

    //
    // const middleware = [
    //     sagaMiddleware,
    //     websocketMiddleware,
    // ];
    //
    // if (isDevelopment) {
    //     const createLogger = require('redux-logger').createLogger;
    //     middleware.push(createLogger());
    // }
    //
    // const store = createStore(
    //     rootReducer,
    //     initialState,
    //     composeEnhancers(applyMiddleware(...middleware)),
    // );
    //
    // if (module.hot) {
    //     module.hot.accept('./reducer', () => {
    //         const nextRootReducer = require('./reducer').default;
    //         store.replaceReducer(nextRootReducer);
    //     })
    // }
    // websocketMiddleware.run(sagas.websocket('ws://hackweek:5000/ws'));
    // store.runSaga = sagaMiddleware.run;
    // store.close = () => store.dispatch(END);
    // return store;
}
