import React from 'react';
import {Text, View, Button, TextInput} from 'react-native';
import styles from './styles';

const PendingDetails = (props) => {
    const {
        onOverrideManualAction,
        build: {
            pending,
            totalSteps,
            totalSuccess,
            totalSkipped,
        }
    } = props;
    const {
        question,
        title
    } = pending;
    return (
        <View>
            <Text style={styles.pending}>Total Skipped Steps: {totalSkipped}</Text>
            <Text style={styles.pending}>Total Successful Steps: {totalSuccess}</Text>
            <Text style={styles.pending}>Total Steps: {totalSteps}</Text>
            <View style={styles.pending}>
                <Text>There is a Pending step:</Text>
                <Text style={styles.pendingDetails}>{title}</Text>
                <Text style={styles.pendingDetails}>{question}</Text>
            </View>
            <TextInput
                style={styles.reasonBox}
                multiline={true}
                placeholder={'Reason'}
                placeholderTextColor={'grey'}
            />
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {
                        onOverrideManualAction(props.build, false);
                    }}
                    title="Deny"
                    color="#d52101"
                    style={{flex: 1}}
                />
                <Text style={{flex: 1}}></Text>
                <Button
                    onPress={() => {
                        onOverrideManualAction(props.build, true);
                    }}
                    title="Approve"
                    color="#09a84c"
                    style={{flex: 1}}
                />
            </View>
        </View>
    )
};

export default PendingDetails;
