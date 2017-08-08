import createSagaMiddleware, {END} from 'redux-saga';
import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import reducer from './reducer';
import websocketSaga from './sagas/websockets';

export default function configureStore(initialState = {}, additionalMiddleware = [], composeFunc = compose) {
    const sagaMiddleware = createSagaMiddleware();
    const websocketMiddleware = createSagaMiddleware();

    const middleware = additionalMiddleware.concat([
        thunkMiddleware,
        sagaMiddleware,
        websocketMiddleware,
    ]);

    const store = createStore(
        reducer,
        initialState,
        composeFunc(applyMiddleware(...middleware)),
    );

    if (module.hot) {
        module.hot.accept('./reducer', () => {
            const nextRootReducer = require('./reducer').default;
            store.replaceReducer(nextRootReducer);
        })
    }
    websocketMiddleware.run(websocketSaga('ws://hackweek:5000/ws'));
    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);
    return store;
}
