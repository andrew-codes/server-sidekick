import React, {Component} from 'react';
import {Bar} from 'react-native-progress';
import {bindActionCreators} from 'redux';
import {builds} from 'v1-status-state-modules';
import {connect} from 'react-redux';
import {Text, View} from 'react-native';
import styles from './styles';
import DefaultDetails from '../DefaultDetails/DefaultDetails'
import FailedDetails from '../FailedDetails/FailedDetails'
import PendingDetails from '../PendingDetails/PendingDetails'

class PipelineDetails extends Component {
    getDetailComponent = (status) => {
        switch (status) {
            case "pending":
            case 6:
                return PendingDetails;
            case 1:
                return DefaultDetails;
            case "error":
            case 3:
                return FailedDetails;
            case "success":
            case 2:
                return DefaultDetails;
            case "canceled":
            case 4:
                return DefaultDetails;
            default:
                return DefaultDetails;
        }
    };

    render() {
        const {
            progressColor,
            build,
            isBuildDetailsRequestPending,
        } = this.props;
        if (!build) {
            return null;
        }
        const {
            group,
            pipelineName,
            project,
            severity,
            totalFailed,
            totalSkipped,
            totalSteps,
            totalSuccess,
        } = build;
        const DetailComponent = this.getDetailComponent(severity);
        return (
            <View style={styles.piDetails}>
                <View style={styles.spacer} />
                <Text style={styles.title}>{pipelineName} {group} {project}</Text>
                {!isBuildDetailsRequestPending && (
                    <Bar
                        color={progressColor}
                        progress={(totalFailed + totalSuccess + totalSkipped) / totalSteps}
                    />
                )}
                {!isBuildDetailsRequestPending && (
                    <DetailComponent {...this.props} />
                )}
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        build: builds.selectors.getSelected(state),
        isBuildDetailsRequestPending: builds.selectors.getIsBuildDetailsRequestPending(state),
    };
}

function dispatchToProps(dispatch) {
    return {
        fetchBuildDetails: bindActionCreators(builds.actions.creators.fetchBuildDetails, dispatch),
    };
}

export default connect(mapStateToProps, dispatchToProps)(PipelineDetails);

