import {createActions} from 'redux-actions';

export const ApplyTextFilter = 'applyTextFilter';
export const AddBuilds = 'addBuilds';
export const FetchingPending = 'fetchingPending';
export const FetchingSuccess = 'fetchingSuccess';
export const FetchBuilds = 'fetchBuilds';
export const FetchBuildDetails = 'fetchBuildDetails';
export const MuteBuilds = 'muteBuilds';
export const MarkNotified = 'markNotified';
export const SelectBuild = 'selectBuild';
export const DeselectBuild = 'deselectBuild';
export const ManualActionOverride = 'ManualActionOverride';

export const creators = createActions({
    [ApplyTextFilter]: value => ({value}),
    [AddBuilds]: (builds = []) => ({builds}),
    [MuteBuilds]: ids => ({ids}),
    [MarkNotified]: ids => ({ids}),
    [SelectBuild]: id => ({id}),
    [DeselectBuild]: () => null,
    [FetchBuildDetails]: (id) => ({id}),
    [FetchBuilds]: (numberToFetch) => ({numberToFetch}),
    [ManualActionOverride]: (build, shouldOverride) => ({...build, shouldOverride}),
});
