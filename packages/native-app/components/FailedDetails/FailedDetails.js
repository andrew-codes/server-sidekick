import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

const FailedDetails = (props) => {
    const {
        build: {
            totalSteps,
            totalFailed,
            totalSuccess,
            totalSkipped,
            phase,
            stage,
            step,
        }
    } = props;
    return (
        <View>
            <Text style={styles.failed}>Total Failed Steps: {totalFailed}</Text>
            <View style={styles.failed}>
                <Text>Failed on:</Text>
                <Text style={styles.failureDetails}>Phase: "{phase}"</Text>
                <Text style={styles.failureDetails}>Stage: "{stage}"</Text>
                <Text style={styles.failureDetails}>Step: "{step}"</Text>
            </View>
            <Text style={styles.failed}>Total Skipped Steps: {totalSkipped}</Text>
            <Text style={styles.failed}>Total Success Steps: {totalSuccess}</Text>
            <Text style={styles.failed}>Total Steps Steps: {totalSteps}</Text>
        </View>
    )
}

export default FailedDetails;
