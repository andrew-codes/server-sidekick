import React from 'react';
import {Bar} from 'react-native-progress';
import {Text, View} from 'react-native';
import StatusIcon from '../StatusIcon/StatusIcon';
import styles from './styles';

export default class PipelineInstanceStatus extends React.Component {
    render() {
        const {
            label,
            lastRetrieval,
            progress,
            status
        } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <StatusIcon
                        style={styles.icon}
                        status={status}
                    />
                    <Text style={styles.text1}>{label}</Text>
                    <View/>
                </View>
                <View style={styles.bottom}>
                    <Text style={styles.text2}>{lastRetrieval}</Text>
                </View>
            </View>
        );
    }
}

// <Bar style={styles.item}
//      progress={progress}
// />
