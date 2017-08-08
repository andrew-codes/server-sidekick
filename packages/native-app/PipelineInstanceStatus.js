import React from 'react';
import { Bar } from 'react-native-progress';
import { Text, View, StyleSheet } from 'react-native';

export default class PipelineInstanceStatus extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>hello</Text>
        <Bar style={styles.item}
        progress={.4}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: 6,
    alignItems: 'center',
    justifyContent: 'space-around'

  },
  item: {
    height: 6,
  }
});
