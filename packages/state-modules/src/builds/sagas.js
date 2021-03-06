import {call, put, select, takeEvery} from 'redux-saga/effects';
import * as api from 'v1-status-js-api';
import * as actions from './actions';
import {getPendingRequests} from './selectors';

export default [
    () => takeEvery(actions.FetchBuildDetails, fetchBuildDetails),
    () => takeEvery(actions.FetchBuilds, fetchBuilds),
    () => takeEvery(actions.OverrideManualAction, overrideTheManualAction),
];

function* fetchBuildDetails({payload: {id}}) {
    try {
        const pendingRequests = yield select(getPendingRequests);
        if (pendingRequests.indexOf(id) >= 0) {
            return;
        }
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
        const initialState = yield call(api.getBuildsSeedState, numberToFetch);
        yield put({
            type: actions.AddBuilds, payload: {
                builds: Object.values(initialState.builds.entities)
            }
        });
        yield put({type: actions.FetchingSuccess, payload: {keys: []}});
    } catch (e) {
        console.log(e);
        // we should handle errors in the UI
        //yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}

function* overrideTheManualAction({payload: {instanceId, pending: {outputKey}, phase, shouldOverride, stage, status, stepIndex}}) {
    try {
        yield put({type: actions.FetchingPending, payload: {keys: [instanceId]}});
        yield call(api.overrideManualAction, {instanceId, outputKey, phase, stage, status, stepIndex}, shouldOverride);
        yield put({type: actions.FetchingSuccess, payload: {keys: [instanceId]}});
    }
    catch (e) {
        debugger;
        console.log(e);
        // we should handle errors in the UI
        //yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}
