import moment from 'moment';
import React from 'react';
import PipelineInstanceStatus from '../PipelineInstanceStatus/PipelineInstanceStatus';
import {FlatList, View} from 'react-native';
import styles from './styles';

export default class App extends React.Component {
    render() {
        const {pipelineInstances} = this.props;
        return (
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
        );
    }
}
