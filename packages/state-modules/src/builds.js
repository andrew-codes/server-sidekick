import moment from 'moment';
import {createSelector} from 'reselect';
import {createActions, handleActions} from 'redux-actions';
import {getBuildsSeedState} from 'v1-status-js-api';

const ApplyTextFilterAction = 'ApplyTextFilter';
const AddBuilds = 'AddBuilds';
const FetchBuildsSuccess = 'FetchBuilds-Success';
const MuteBuilds = 'MuteBuilds';

// -- Selectors
const getRoot = (state) => state.builds;
const getTextFilterValue = createSelector(getRoot, root => root.textFilter);
const getTwentyBuilds = createSelector(getRoot, root => Object.keys(root.entities)
    .map(id => ({
        ...root.entities[id],
        lastRetrieval: moment(root.entities[id].lastRetrieval),
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
    .slice(0, 20));
const getFilteredBuilds = createSelector(getTwentyBuilds, getTextFilterValue, (builds, textFilter) => {
    if (!textFilter) {
        return builds;
    }
    const filter = textFilter.toLowerCase();
    return builds.filter(build => build.name.toLowerCase().indexOf(filter) >= 0);
});
const getMutedBuildIds = createSelector(getRoot, root => root.muted || []);
const hasUnacknowledgedFailures = createSelector(getFilteredBuilds, getMutedBuildIds, (builds, mutedBuildIds) => builds.reduce((output, build) => (
    output || (mutedBuildIds.indexOf(build.instanceId) < 0 && build.severity === 3)
), false));
export const selectors = {
    getBuilds: getTwentyBuilds,
    getFilteredBuilds,
    hasUnacknowledgedFailures,
};

// -- Action creators
const creators = createActions({
    [ApplyTextFilterAction]: value => ({value}),
    [AddBuilds]: (builds = [], lastRetrieval = (new Date()).toString()) => ({builds, lastRetrieval}),
    [MuteBuilds]: ids => ({ids}),
});
const fetchBuilds = (numberToFetch = 20) => (dispatch) => {
    getBuildsSeedState(numberToFetch)
        .then(data => {
            dispatch({
                type: FetchBuildsSuccess,
                payload: data,
            });
        });
};
export const actionCreators = {
    ...creators,
    fetchBuilds,
};

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
                        ...build,
                        lastRetrieval: lastRetrieval,
                    },
                }), {}),
        },
    }),
    [FetchBuildsSuccess]: (state, {payload: {builds: {entities}}}) => ({
        ...state,
        entities: {
            ...state.entities,
            ...entities,
        },
    }),
    [MuteBuilds]: (state, {payload: {ids}}) => ({
        ...state,
        muted: (state.muted || [])
            .filter(id => ids.indexOf(id) < 0)
            .concat(ids),
    }),
}, defaultState);
