import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import React from 'react';
import {bindActionCreators} from 'redux';
import {builds} from 'v1-status-state-modules';
import {connect} from 'react-redux';
import {createStyleSheet, withStyles} from 'material-ui/styles';
import BuildDetails from './../BuildDetails';
import StatusList from '../StatusList';
import TextFilter from './../TextFilter';

const styleSheet = createStyleSheet(theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
    }),
    detailsPaper: {
        width: '40%',
    },
}));

const Home = ({
                  builds,
                  classes,
                  continueBuild,
                  fetchBuildDetails,
                  isBuildDetailsRequestPending,
                  onDeselectBuild,
                  onFilterValueChange,
                  onOverrideManualAction,
                  onMuteBuilds,
                  onSelectBuild,
                  selectedBuild,
              }) => (
    <div>
        <Paper
            className={classes.root}
            elevation={4}
        >
            <Typography
                component="h3"
                type="headline"
            >
                Builds
            </Typography>
            <TextFilter
                fullWidth={true}
                onChange={(evt) => {
                    onFilterValueChange(evt.target.value)
                }}
            />
            <StatusList
                builds={builds}
                onFavorited={console.log}
                onMuted={(id) => onMuteBuilds([id])}
                onSelected={onSelectBuild}
            />
        </Paper>
        {Boolean(selectedBuild) && (
            <Drawer
                anchor="right"
                classes={{
                    paper: classes.detailsPaper,
                }}
                onRequestClose={onDeselectBuild}
                open={Boolean(selectedBuild)}
            >
                <BuildDetails
                    build={selectedBuild}
                    fetchBuildDetails={fetchBuildDetails}
                    onManualActionOverride={shouldOverride => onOverrideManualAction(selectedBuild, shouldOverride)}
                    pending={isBuildDetailsRequestPending}
                />
            </Drawer>
        )}
    </div>
);

const stateToProps = (state) => ({
    builds: builds.selectors.getFilteredBuilds(state),
    selectedBuild: builds.selectors.getSelected(state),
    isBuildDetailsRequestPending: builds.selectors.getIsBuildDetailsRequestPending(state),
});
const dispatchToProps = (dispatch) => ({
    onFilterValueChange: bindActionCreators(builds.actions.creators.applyTextFilter, dispatch),
    onMuteBuilds: bindActionCreators(builds.actions.creators.muteBuilds, dispatch),
    selectBuild: bindActionCreators(builds.actions.creators.selectBuild, dispatch),
    fetchBuildDetails: bindActionCreators(builds.actions.creators.fetchBuildDetails, dispatch),
    onDeselectBuild: bindActionCreators(builds.actions.creators.deselectBuild, dispatch),
    onOverrideManualAction: bindActionCreators(builds.actions.creators.overrideManualAction, dispatch),
});
const mergeProps = (stateProps, dispatchProps, props) => ({
    ...stateProps,
    ...dispatchProps,
    onSelectBuild: (id) => {
        dispatchProps.selectBuild(id);
        dispatchProps.fetchBuildDetails(id);
    },
    ...props,
});

export default connect(stateToProps, dispatchToProps, mergeProps)(withStyles(styleSheet)(Home));
