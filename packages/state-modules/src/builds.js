import {createSelector} from 'reselect';

const getRoot = (state) => state.builds;

export const selectors = {
    getBuilds: createSelector(getRoot, (root) => Object.keys(root.entities).map(id => root.entities[id])),
};
