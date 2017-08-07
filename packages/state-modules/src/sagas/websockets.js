import {all, call, fork, put, take} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';

export default (url) => {
    const initWebSocket = () => eventChannel(emitter => {
        const ws = new WebSocket(url);
        ws.onopen = () => {
            console.log(`opening websocket: ${url}`);
        };
        ws.onerror = (error) => {
            console.log(`WebSocket error: ${error}`);
            console.dir(error)
        };
        ws.onmessage = (e) => {
            console.log(e);
            // return emitter({type: 'TEST', data: e.data});
        };

        return () => {
            console.log('Socket off');
        }
    });

    function* watchWebSocket() {
        while (true) {
            const channel = yield call(initWebSocket);
            const action = yield take(channel);
            yield put(action);
        }
    }

    return function* root() {
        yield all([
            fork(watchWebSocket),
        ]);
    };
};
