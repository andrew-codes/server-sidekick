import {all, call, fork, put, take} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import * as builds from './../builds';

export default (url) => {
    const initWebSocket = () => eventChannel(dispatch => {
        const ws = new WebSocket(url);
        ws.onopen = () => {
            console.log(`opening websocket: ${url}`);
        };
        ws.onerror = (error) => {
            console.log(`WebSocket error: ${error}`);
            // console.dir(error)
        };
        ws.onmessage = (e) => {
            const data = JSON.parse(e.data);
            dispatch(builds.actions.creators.addBuilds(data));
            // return dispatch({type: 'TEST', data: e.data});
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
