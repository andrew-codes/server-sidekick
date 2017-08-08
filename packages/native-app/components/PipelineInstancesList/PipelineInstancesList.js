import React from 'react';
import PipelineInstanceStatus from '../PipelineInstanceStatus/PipelineInstanceStatus';
import { FlatList, View, Text } from 'react-native';
import styles from './styles';

export default class App extends React.Component {
  render() {
    const { pipelineInstances, filter } = this.props;

    const filterRegex = new RegExp(filter, "i");
    const filteredInstances = filter ? pipelineInstances.filter(pi => pi.label.search(filterRegex) > -1) : pipelineInstances;
    return (
      <View style={styles.piList}>
        <FlatList
        data={filteredInstances}
        renderItem={({ item }) =>
          <PipelineInstanceStatus
          item={{...item}}
          />}
        />
      </View>
    );
  }
}
