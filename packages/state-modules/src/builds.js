import moment from 'moment';
import {createSelector} from 'reselect';
import {createActions, handleActions} from 'redux-actions';

const applyTextFilterAction = 'applyTextFilter';

const getRoot = (state) => state.builds;
const getTextFilterValue = createSelector(getRoot, root => root.textFilter);
const getBuilds = createSelector(getRoot, root => Object.keys(root.entities)
    .map(id => ({
        ...root.entities[id],
        lastRetrieval: moment(root.entities[id].lastRetrieval)
    }))
    .slice(0, 20)
    .sort((a, b) => {
        if (a.lastRetrieval.isBefore(b.lastRetrieval)) return 1;
        if (b.lastRetrieval.isBefore(a.lastRetrieval)) return -1;
        return 0;
    })
);
const getFilteredBuilds = createSelector([getBuilds, getTextFilterValue], (builds, textFilter) => {
    if (!textFilter) {
        return builds;
    }
    const filter = textFilter.toLowerCase();
    return builds.filter(build => build.name.toLowerCase().indexOf(filter) >= 0);
});
export const selectors = {
    getBuilds,
    getFilteredBuilds,
};

const creators = createActions({
    [applyTextFilterAction]: (value) => ({value}),
});
export const actionCreators = creators;

const defaultState = {
    entities: {},
};
export default handleActions({
    [applyTextFilterAction]: (state, {payload: {value}}) => ({
        ...state,
        textFilter: value,
    })
}, defaultState);
