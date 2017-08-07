import createSagaMiddleware, {END} from 'redux-saga';
import {createStore, applyMiddleware, compose} from 'redux';
import reducer from './reducers';
import websocketSaga from './sagas/websockets';

export default function configureStore(initialState = {}, additionalMiddleware = [], composeFunc = compose) {
    const sagaMiddleware = createSagaMiddleware();
    const websocketMiddleware = createSagaMiddleware();

    const middleware = additionalMiddleware.concat([
        sagaMiddleware,
        websocketMiddleware,
    ]);

    const store = createStore(
        reducer,
        initialState,
        composeFunc(applyMiddleware(...middleware)),
    );

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers').default;
            store.replaceReducer(nextRootReducer);
        })
    }
    websocketMiddleware.run(websocketSaga('ws://hackweek:5000/ws'));
    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);
    return store;
}
