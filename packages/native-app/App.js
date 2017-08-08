import React from 'react';
import PipelineInstancesList from './components/PipelineInstancesList/PipelineInstancesList';

export default class App extends React.Component {
  render() {
    const pis = [
      {label: "one", progress: .4, key:1},
      {label: "two", progress: .7, key:2},
      {label: "three", progress: .25, key:3},
      {label: "four", progress: 1, key:4},
    ]
    return (
      <PipelineInstancesList
        pipelineInstances={pis}
      />
    );
  }
}
