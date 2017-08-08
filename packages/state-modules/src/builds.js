import moment from 'moment';
import {createSelector} from 'reselect';
import {createActions, handleActions} from 'redux-actions';

const ApplyTextFilterAction = 'ApplyTextFilter';
const AddBuilds = 'AddBuilds';

// -- Selectors
const getRoot = (state) => state.builds;
const getTextFilterValue = createSelector(getRoot, root => root.textFilter);
const getTwentyBuilds = createSelector([getRoot], root => Object.keys(root.entities)
    .map(id => ({
        ...root.entities[id],
        lastRetrieval: moment(root.entities[id].lastRetrieval)
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
const getFilteredBuilds = createSelector([getTwentyBuilds, getTextFilterValue], (builds, textFilter) => {
    if (!textFilter) {
        return builds;
    }
    const filter = textFilter.toLowerCase();
    return builds.filter(build => build.name.toLowerCase().indexOf(filter) >= 0);
});
const hasUnacknowledgedFailures = createSelector([getFilteredBuilds], (builds) => builds.reduce((output, build) => output || build.severity === 3), false);
export const selectors = {
    getBuilds: getTwentyBuilds,
    getFilteredBuilds,
    hasUnacknowledgedFailures,
};

// -- Action creators
const creators = createActions({
    [ApplyTextFilterAction]: (value) => ({value}),
    [AddBuilds]: (builds = [], lastRetrieval = (new Date()).toString()) => ({builds, lastRetrieval}),
});
export const actionCreators = creators;

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
}, defaultState);
