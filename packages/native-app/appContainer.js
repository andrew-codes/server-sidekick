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
      if (!this.props.selectedBuild && nextProps.selectedBuild)
      {
        const build = nextProps.selectedBuild
        this.props.navigator.push({
          component: PipelineDetails,
          title: `${build.pipelineName} ${build.group} ${build.project}`,
          passProps: { ...build },
          onLeftButtonPress: this.props.onDeselectBuild,
          leftButtonTitle: "< Back",
        });
      }
      else if (this.props.selectedBuild && !nextProps.selectedBuild) {
        this.props.navigator.popToTop();
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
                    pipelineInstances={this.props.pis}
                    navigator={this.props.navigator}
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
        isBuildDetailsRequestPending: builds.selectors.getIsBuildDetailsRequestPending(state),
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
    };
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
