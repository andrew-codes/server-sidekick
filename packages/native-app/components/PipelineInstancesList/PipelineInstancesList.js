import moment from 'moment';
import React from 'react';
import PipelineInstanceStatus from '../PipelineInstanceStatus/PipelineInstanceStatus';
import PipelineDetails from '../PipelineDetails/PipelineDetails';
import {FlatList, View, Text, TouchableHighlight} from 'react-native';
import styles from './styles';

export default class PipelineInstancesList extends React.Component {
    onPress = () => {
      console.log("I was pressed")
      this.props.navigator.push({
        component: PipelineDetails,
        title: 'Details',
        passProps: { myProp: 'genius' },
      });
    }
    render() {
        const {pipelineInstances} = this.props;
        return (
          <TouchableHighlight
            onPress={this.onPress}
            style={{flex: 1}}
          >
            <View style={styles.piList}>
                <FlatList
                    data={pipelineInstances}
                    keyExtractor={(item, index) => item.instanceId}
                    renderItem={({item}) => (
                        <PipelineInstanceStatus
                            label={`${item.pipelineName} ${item.group} ${item.project}`}
                            lastRetrieval={moment(item.lastRetrieval).format('MM/DD/YY hh:mm:ss')}
                            progress={item.progress}
                            status={item.severity}
                        />
                    )}
                />
            </View>
          </TouchableHighlight>
        );
    }
}
