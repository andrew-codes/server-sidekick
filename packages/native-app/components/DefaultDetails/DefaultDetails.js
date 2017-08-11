import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

const DefaultDetails = (props) => {
    const {
        build: {
            totalSteps,
            totalSuccess,
            totalSkipped
        }
    } = props;
    return (
        <View>
            <Text style={styles.details}>Total Skipped Steps: {totalSkipped}</Text>
            <Text style={styles.details}>Total Successful Steps: {totalSuccess}</Text>
            <Text style={styles.details}>Total Steps: {totalSteps}</Text>
        </View>
    )
}

export default DefaultDetails;
