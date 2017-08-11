import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {builds} from 'v1-status-state-modules';
import {connect} from 'react-redux';
import {Text, View, Button, TextInput} from 'react-native';
import styles from './styles';

class PendingDetails extends Component {
    componentDidMount() {
        const {
            build,
            fetchBuildDetails,
        } = this.props;
        if (!build.pending) {
            fetchBuildDetails(build.instanceId);
        }
    }

    render() {
        const {
            onOverrideManualAction,
            build: {
                pending,
                totalSteps,
                totalSuccess,
                totalSkipped,
            }
        } = this.props;
        return (
            <View>
                <Text style={styles.pending}>Total Skipped Steps: {totalSkipped}</Text>
                <Text style={styles.pending}>Total Successful Steps: {totalSuccess}</Text>
                <Text style={styles.pending}>Total Steps: {totalSteps}</Text>
                {Boolean(pending) && (
                    <View style={styles.pending}>
                        <View style={styles.pending}>
                            <Text>There is a Pending step:</Text>
                            <Text style={styles.pendingDetails}>{pending.title}</Text>
                            <Text style={styles.pendingDetails}>{pending.question}</Text>
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
                                    onOverrideManualAction(this.props.build, false);
                                }}
                                title="Deny"
                                color="#d52101"
                                style={{flex: 1}}
                            />
                            <Text style={{flex: 1}}></Text>
                            <Button
                                onPress={() => {
                                    onOverrideManualAction(this.props.build, true);
                                }}
                                title="Approve"
                                color="#09a84c"
                                style={{flex: 1}}
                            />
                        </View>
                    </View>
                )}
            </View>
        )
    }
}

function dispatchToProps(dispatch) {
    return {
        fetchBuildDetails: bindActionCreators(builds.actions.creators.fetchBuildDetails, dispatch),
    };
}

export default connect(() => ({}), dispatchToProps)(PendingDetails);
