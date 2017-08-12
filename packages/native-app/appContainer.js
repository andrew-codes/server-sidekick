import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {builds} from 'v1-status-state-modules';
import {connect} from 'react-redux'
import {View} from 'react-native';
import Notify from './components/Notify';
import PipelineInstancesList from './components/PipelineInstancesList/PipelineInstancesList';
import PipelineDetails from './components/PipelineDetails/PipelineDetails';

class AppContainer extends Component {
    componentDidMount() {
        this.props.fetchBuilds();
    }

    componentWillUpdate(nextProps) {
        if (!this.props.selectedBuild && nextProps.selectedBuild) {
            const {
                navigator,
                onDeselectBuild,
                overrideManualAction,
                selectedBuild,
            } = nextProps;
            const color = getSeverityColor(selectedBuild.severity);
            navigator.push({
                component: PipelineDetails,
                title: 'Pipeline Details',
                passProps: {
                    progressColor: color,
                    onOverrideManualAction: overrideManualAction,
                    navigator,
                },
                onLeftButtonPress: () => {
                    onDeselectBuild();
                    navigator.popToTop();
                },
                leftButtonTitle: "< Back",
                barTintColor: color,
                tintColor: "#ffffff",
                titleTextColor: "#ffffff",
            });
        }
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                }}>
                <Notify
                    builds={this.props.unNotifiedBuilds}
                    markNotified={this.props.markNotified}
                />
                <PipelineInstancesList
                    navigator={this.props.navigator}
                    pipelineInstances={this.props.pis}
                    onMute={this.props.onMute}
                    onSelectBuild={this.props.onSelectBuild}
                />
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        pis: builds.selectors.getFilteredBuilds(state),
        selectedBuild: builds.selectors.getSelected(state),
        unNotifiedBuilds: builds.selectors.getUnNotifiedFailedBuilds(state),
    };
}

function dispatchToProps(dispatch) {
    return {
        fetchBuilds: bindActionCreators(builds.actions.creators.fetchBuilds, dispatch),
        selectBuild: bindActionCreators(builds.actions.creators.selectBuild, dispatch),
        fetchBuildDetails: bindActionCreators(builds.actions.creators.fetchBuildDetails, dispatch),
        onDeselectBuild: bindActionCreators(builds.actions.creators.deselectBuild, dispatch),
        markNotified: bindActionCreators(builds.actions.creators.markNotified, dispatch),
        overrideManualAction: bindActionCreators(builds.actions.creators.overrideManualAction, dispatch),
        onMute: bindActionCreators(builds.actions.creators.muteBuilds, dispatch),
    };
}

function getSeverityColor(status) {
    switch (status) {
        case "pending":
        case 1:
        case 6:
            return "#005293";
        case "error":
        case 3:
            return "#d52101";
        case "success":
        case 2:
            return "#09a84c";
        case "canceled":
        case 4:
            return "grey";
        default:
            return "#000000";
    }
}

const mergeProps = (stateProps, dispatchProps, props) => ({
    ...stateProps,
    ...dispatchProps,
    onSelectBuild: (id) => {
        dispatchProps.selectBuild(id);
        dispatchProps.fetchBuildDetails(id);
    },
    ...props,
});

export default connect(mapStateToProps, dispatchToProps, mergeProps)(AppContainer);
