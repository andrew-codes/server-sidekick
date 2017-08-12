import {handleActions} from 'redux-actions';
import * as actions from './actions';

// -- Reducer
const defaultState = {
    entities: {},
};
export default handleActions({
    [actions.ApplyTextFilter]: (state, {payload: {value}}) => ({
        ...state,
        textFilter: value,
    }),
    [actions.AddBuilds]: (state, {payload: {builds, lastRetrieval}}) => ({
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
    [actions.MuteBuilds]: (state, {payload: {ids}}) => ({
        ...state,
        muted: (state.muted || [])
            .filter(id => ids.indexOf(id) < 0)
            .concat(ids),
    }),
    [actions.MarkNotified]: (state, {payload: {ids}}) => ({
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
    [actions.SelectBuild]: (state, {payload: {id}}) => ({
        ...state,
        selected: id,
    }),
    [actions.DeselectBuild]: (state, action) => ({
        ...state,
        selected: null,
    }),
    [actions.FetchingPending]: (state, {payload: {keys}}) => ({
        ...state,
        pendingRequests: (state.pendingRequests || [])
            .filter(requestKey => keys.indexOf(requestKey) < 0)
            .concat(keys)
    }),
    [actions.FetchingSuccess]: (state, {payload: {keys}}) => ({
        ...state,
        pendingRequests: (state.pendingRequests || [])
            .filter(requestKey => keys.indexOf(requestKey) < 0)
    }),
    [actions.OverrideManualAction]: (state, {payload: {instanceId}}) => ({
        ...state,
        entities: {
            ...state.entities,
            [instanceId]: {
                ...state.entities[instanceId],
                severity: 1,
                totalSuccess: state.entities[instanceId].totalSuccess + 1,
                pending: null,
            }
        }
    })
}, defaultState);
