import React from 'react';
import PipelineInstanceStatus from '../PipelineInstanceStatus/PipelineInstanceStatus';
import { FlatList, View } from 'react-native';
import styles from './styles';

export default class App extends React.Component {
  render() {
    const { pipelineInstances } = this.props;
    return (
      <View style={styles.piList}>
        <FlatList
        data={pipelineInstances}
        renderItem={({ item }) =>
          <PipelineInstanceStatus
          label={item.label}
          progress={item.progress}
          />}
        />
      </View>
    );
  }
}
