import moment from 'moment';
import {call, put, takeEvery} from 'redux-saga/effects';
import {createSelector} from 'reselect';
import {createActions, handleActions} from 'redux-actions';
import * as api from 'v1-status-js-api';

const ApplyTextFilterAction = 'ApplyTextFilter';
const AddBuilds = 'AddBuilds';
const FetchingPending = 'FetchingPending';
const FetchingSuccess = 'FetchingSuccess';
const FetchBuilds = 'FetchBuilds';
const FetchBuildDetails = 'FetchBuildDetails';
const MuteBuilds = 'MuteBuilds';
const MarkNotified = 'MarkNotified';
const SelectBuild = 'SelectBuild';
const DeselectBuild = 'DeselectBuild';

// -- Selectors
const getRoot = (state) => state.builds;
const getIsBuildDetailsRequestPending = createSelector(getRoot, root => (root.pendingRequests || []).indexOf(root.selected) >= 0);
const getTextFilterValue = createSelector(getRoot, root => root.textFilter);
const getMutedBuildIds = createSelector(getRoot, root => root.muted || []);
const getSelected = createSelector(getRoot, root => root.selected
    ? ({
        ...root.entities[root.selected],
        lastRetrieval: moment(root.entities[root.selected].lastRetrieval),
    })
    : null
);
const getBuilds = createSelector(getRoot, getMutedBuildIds, (root, mutedIds) => Object.keys(root.entities)
    .map(id => ({
        ...root.entities[id],
        lastRetrieval: moment(root.entities[id].lastRetrieval),
        muted: mutedIds.indexOf(id) >= 0,
        progress: 0,
    }))
    .sort((a, b) => {
        if (a.lastRetrieval.isAfter(b.lastRetrieval)) {
            return -1;
        }
        if (b.lastRetrieval.isAfter(a.lastRetrieval)) {
            return 1;
        }
        return 0;
    })
);
const getLatestTwentyBuilds = createSelector(getBuilds, builds => builds.slice(0, 20));
const getFilteredBuilds = createSelector(getLatestTwentyBuilds, getTextFilterValue, (builds, textFilter) => {
    if (!textFilter) {
        return builds;
    }
    const filter = textFilter.toLowerCase();
    return builds.filter(build => build.name.toLowerCase().indexOf(filter) >= 0);
});
const getFailedBuilds = createSelector(getFilteredBuilds, builds => builds.filter(build => build.severity === 3));
const hasUnacknowledgedFailures = createSelector(getFailedBuilds, getMutedBuildIds, (builds, mutedBuildIds) => builds.filter(build => !build.muted).length > 0);
const getUnNotifiedFailedBuilds = createSelector(getFailedBuilds, (failedBuilds) => failedBuilds.filter(build => build.notified !== undefined && !build.notified));

export const selectors = {
    getBuilds: getLatestTwentyBuilds,
    getFilteredBuilds,
    getSelected,
    hasUnacknowledgedFailures,
    getUnNotifiedFailedBuilds,
    getIsBuildDetailsRequestPending,
};

// -- Action creators
export const actionCreators = createActions({
    [ApplyTextFilterAction]: value => ({value}),
    [AddBuilds]: (builds = []) => ({builds}),
    [MuteBuilds]: ids => ({ids}),
    [MarkNotified]: ids => ({ids}),
    [SelectBuild]: id => ({id}),
    [DeselectBuild]: () => null,
    [FetchBuildDetails]: (id) => ({id}),
    [FetchBuilds]: (numberToFetch) => ({numberToFetch}),
});

// Sagas
function* fetchBuildDetails({payload: {id}}) {
    try {
        yield put({type: FetchingPending, payload: {keys: [id]}});
        const build = yield call(api.fetchBuildDetails, id);
        yield put({
            type: AddBuilds, payload: {
                builds: [{
                    ...build,
                    instanceId: id,
                    notified: true,
                }],
            },
        });
        yield put({type: FetchingSuccess, payload: {keys: [id]}});
    } catch (e) {
        console.log(e);
        // we should handle errors in the UI
        //yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}

function* fetchBuilds({payload: {numberToFetch}}) {
    try {
        yield put({type: FetchingPending, payload: {keys: []}});
        const build = yield call(api.getBuildsSeedState, numberToFetch);
        yield put({
            type: AddBuilds, payload: {
                builds: [{
                    ...build,
                    lastRetrieval: (new Date()).toString(),
                }]
            }
        });
        yield put({type: FetchingSuccess, payload: {keys: []}});
    } catch (e) {
        console.log(e);
        // we should handle errors in the UI
        //yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}

export const sagas = [
    () => takeEvery(FetchBuildDetails, fetchBuildDetails),
    () => takeEvery(FetchBuilds, fetchBuilds),
];

// -- Reducer
const defaultState = {
    entities: {},
};
export default handleActions({
    [ApplyTextFilterAction]: (state, {payload: {value}}) => ({
        ...state,
        textFilter: value,
    }),
    [AddBuilds]: (state, {payload: {builds, lastRetrieval}}) => ({
        ...state,
        entities: {
            ...state.entities,
            ...builds
                .reduce((output, build) => ({
                    ...output,
                    [build.instanceId]: {
                        notified: false,
                        ...state.entities[build.instanceId],
                        ...build,
                    },
                }), {}),
        },
    }),
    [MuteBuilds]: (state, {payload: {ids}}) => ({
        ...state,
        muted: (state.muted || [])
            .filter(id => ids.indexOf(id) < 0)
            .concat(ids),
    }),
    [MarkNotified]: (state, {payload: {ids}}) => ({
        ...state,
        entities: {
            ...state.entities,
            ...ids
                .reduce((output, id) => ({
                    ...output,
                    [id]: {
                        ...state.entities[id],
                        notified: true,
                    }
                }), {})
        }
    }),
    [SelectBuild]: (state, {payload: {id}}) => ({
        ...state,
        selected: id,
    }),
    [DeselectBuild]: (state, action) => ({
        ...state,
        selected: null,
    }),
    [FetchingPending]: (state, {payload: {keys}}) => ({
        ...state,
        pendingRequests: (state.pendingRequests || [])
            .filter(requestKey => keys.indexOf(requestKey) < 0)
            .concat(keys)
    }),
    [FetchingSuccess]: (state, {payload: {keys}}) => ({
        ...state,
        pendingRequests: (state.pendingRequests || [])
            .filter(requestKey => keys.indexOf(requestKey) < 0)
    }),
}, defaultState);
