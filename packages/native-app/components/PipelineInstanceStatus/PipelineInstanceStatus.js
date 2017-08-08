import React from 'react';
import { Bar } from 'react-native-progress';
import { Text, View } from 'react-native';
import styles from './styles';

export default class PipelineInstanceStatus extends React.Component {
  render() {
    const { label, progress} = this.props;
    return (
      <View>
        <Text>{label}</Text>
        <Bar style={styles.item}
        progress={progress}
        />
      </View>
    );
  }
}
