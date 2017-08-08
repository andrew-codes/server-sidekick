import React from 'react';
import {Bar} from 'react-native-progress';
import {Text, View} from 'react-native';
import styles from './styles';

export default class PipelineInstanceStatus extends React.Component {
    render() {
        const {
            label,
            lastRetrieval,
            progress,
        } = this.props;
        return (
            <View>
                <Text>{label}</Text>
                <Text>{lastRetrieval}</Text>
                <Bar style={styles.item}
                     progress={progress}
                />
            </View>
        );
    }
}
