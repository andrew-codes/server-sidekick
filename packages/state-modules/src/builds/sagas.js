import {call, put, takeEvery} from 'redux-saga/effects';
import * as api from 'v1-status-js-api';
import * as actions from './actions';

export default [
    () => takeEvery(actions.FetchBuildDetails, fetchBuildDetails),
    () => takeEvery(actions.FetchBuilds, fetchBuilds),
];

function* fetchBuildDetails({payload: {id}}) {
    try {
        yield put({type: actions.FetchingPending, payload: {keys: [id]}});
        const build = yield call(api.fetchBuildDetails, id);
        yield put({
            type: actions.AddBuilds, payload: {
                builds: [{
                    ...build,
                    instanceId: id,
                    notified: true,
                }],
            },
        });
        yield put({type: actions.FetchingSuccess, payload: {keys: [id]}});
    } catch (e) {
        console.log(e);
        // we should handle errors in the UI
        //yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}

function* fetchBuilds({payload: {numberToFetch}}) {
    try {
        yield put({type: actions.FetchingPending, payload: {keys: []}});
        const build = yield call(api.getBuildsSeedState, numberToFetch);
        yield put({
            type: actions.AddBuilds, payload: {
                builds: [{
                    ...build,
                    lastRetrieval: (new Date()).toString(),
                }]
            }
        });
        yield put({type: actions.FetchingSuccess, payload: {keys: []}});
    } catch (e) {
        console.log(e);
        // we should handle errors in the UI
        //yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}
