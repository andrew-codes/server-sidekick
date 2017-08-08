import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import React from 'react';
import {bindActionCreators} from 'redux';
import {builds} from 'v1-status-state-modules';
import {connect} from 'react-redux';
import {createStyleSheet, withStyles} from 'material-ui/styles';
import StatusList from '../StatusList';
import TextFilter from './../TextFilter';

const styleSheet = createStyleSheet(theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
    }),
}));

const Home = ({
                  builds,
                  classes,
                  onFilterValueChange,
                  onMuteBuilds,
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
            />
        </Paper>
    </div>
);

const stateToProps = (state) => ({
    builds: builds.selectors.getFilteredBuilds(state),
});
const dispatchToProps = (dispatch) => ({
    onFilterValueChange: bindActionCreators(builds.actionCreators.applyTextFilter, dispatch),
    onMuteBuilds: bindActionCreators(builds.actionCreators.muteBuilds, dispatch),
});

export default connect(stateToProps, dispatchToProps)(withStyles(styleSheet)(Home));
