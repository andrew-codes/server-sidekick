import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import {Bar} from 'react-native-progress';
import DefaultDetails from '../DefaultDetails/DefaultDetails'
import FailedDetails from '../FailedDetails/FailedDetails'
import PendingDetails from '../PendingDetails/PendingDetails'

export default class PipelineDetails extends Component {
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
            color,
            build: {
                group,
                pipelineName,
                project,
                severity,
                totalFailed,
                totalSkipped,
                totalSteps,
                totalSuccess,
            }
        } = this.props;
        const DetailComponent = this.getDetailComponent(severity);
        const progress = (totalFailed + totalSuccess + totalSkipped) / totalSteps;
        return (
            <View style={styles.piDetails}>
                <View style={styles.spacer} />
                <Text style={styles.title}>{pipelineName} {group} {project}</Text>
                <Bar
                    color={color}
                    progress={progress}
                />
                <DetailComponent {...this.props} />
            </View>
        )
    }
}
