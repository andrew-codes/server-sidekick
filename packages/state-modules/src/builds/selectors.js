import moment from 'moment';
import {createSelector} from 'reselect';

// -- Selectors
export const getRoot = (state) => state.builds;
export const getPendingRequests = createSelector(getRoot, root => root.pendingRequests || []);
export const getSelectedId = createSelector(getRoot, root => root.selected);
export const getIsBuildDetailsRequestPending = createSelector(getPendingRequests, getSelectedId, (pendingRequests, selectedId) => pendingRequests.indexOf(selectedId) >= 0);
export const getTextFilterValue = createSelector(getRoot, root => root.textFilter);
export const getMutedBuildIds = createSelector(getRoot, root => root.muted || []);
export const getBuilds = createSelector(getRoot, getMutedBuildIds, (root, mutedIds) => Object.keys(root.entities)
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
export const getSelected = createSelector(getRoot, getSelectedId, (root, selectedId) => selectedId
    ? ({
        ...root.entities[selectedId],
        lastRetrieval: moment(root.entities[selectedId].lastRetrieval),
    })
    : null
);
export const getLatestTwentyBuilds = createSelector(getBuilds, builds => builds.slice(0, 20));
export const getFilteredBuilds = createSelector(getLatestTwentyBuilds, getTextFilterValue, (builds, textFilter) => {
    if (!textFilter) {
        return builds;
    }
    const filter = textFilter.toLowerCase();
    return builds.filter(build => (build.name.toLowerCase().indexOf(filter) >= 0) || build.pipelineName.toLowerCase().indexOf(filter) >= 0);
});
export const getFailedBuilds = createSelector(getFilteredBuilds, builds => builds.filter(build => build.severity === 3));
export const hasUnacknowledgedFailures = createSelector(getFailedBuilds, getMutedBuildIds, (builds, mutedBuildIds) => builds.filter(build => !build.muted).length > 0);
export const getUnNotifiedFailedBuilds = createSelector(getFailedBuilds, (failedBuilds) => failedBuilds.filter(build => build.notified !== undefined && !build.notified));
