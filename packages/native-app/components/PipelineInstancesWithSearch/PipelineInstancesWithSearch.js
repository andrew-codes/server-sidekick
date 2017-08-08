import React, { Component } from 'react';
import { TextInput, View } from 'react-native';
import PipelineInstancesList from '../PipelineInstancesList/PipelineInstancesList';
import styles from './styles';

export default class PipelineInstancesWithSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    const { pis } = this.props;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.search}
          onChangeText={(text) => this.setState({text})}
          placeholder="Search"
          multiline={false}
        />
        <PipelineInstancesList
        pipelineInstances={pis}
        filter={this.state.text}
        />
      </View>
    );
  }
}
