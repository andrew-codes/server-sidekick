import React from 'react';
import { View, StyleSheet } from 'react-native';
import PipelineInstancesWithSearch from './components/PipelineInstancesWithSearch/PipelineInstancesWithSearch';

export default class App extends React.Component {
  render() {
    const pis = [
      {label: "Project One", progress: .4, status: 'processing', key:1},
      {label: "Project Two", progress: .7, status: 'processing', key:2},
      {label: "Project Three", progress: .25, status: 'pending', key:3},
      {label: "Admin First Time Style to the Modal Open/Close Modal", progress: .85, status: 'processing', key:4},
      {label: "Kevin is a human who lives in a house but not really because he lives in an apartment", progress: 1, status: 'succeeded', key:5},
      {label: "Project Six", progress: 1, status: 'failed', key:6},
      {label: "Porject Seven", progress: .5, status: 'canceled', key:7},
      {label: "Project Eight", progress: 1, status: 'succeeded', key:8},
    ]
    return (
      <View style={styles.container}>
        <PipelineInstancesWithSearch
        pis={pis}
        />
      </View>
    );
  }
}

const styles =  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    height: 6,

  },
});
