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
export const OverrideManualAction = 'OverrideManualAction';
export const ContinueBuild = 'ContinueBuild';

export const creators = createActions({
    [ApplyTextFilter]: value => ({value}),
    [AddBuilds]: (builds = []) => ({
        builds: builds.map(b => ({
            ...b,
            lastRetrieval: (new Date()).toString(),
        }))
    }),
    [ContinueBuild]: id => ({id}),
    [MuteBuilds]: ids => ({ids}),
    [MarkNotified]: ids => ({ids}),
    [SelectBuild]: id => ({id}),
    [DeselectBuild]: () => null,
    [FetchBuildDetails]: (id) => ({id}),
    [FetchBuilds]: (numberToFetch) => ({numberToFetch}),
    [OverrideManualAction]: (build, shouldOverride) => ({...build, shouldOverride}),
});
