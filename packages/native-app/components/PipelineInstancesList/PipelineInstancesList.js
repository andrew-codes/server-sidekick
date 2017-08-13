import moment from 'moment';
import React from 'react';
import PipelineInstanceStatus from '../PipelineInstanceStatus/PipelineInstanceStatus';
import {FlatList, View} from 'react-native';
import styles from './styles';

export default class PipelineInstancesList extends React.Component {
    render() {
        const {
            onSelectBuild,
            pipelineInstances,
        } = this.props;
        return (
            <View style={styles.piList}>
                <FlatList
                    data={pipelineInstances}
                    keyExtractor={(item, index) => item.instanceId}
                    renderItem={({item}) => (
                        <PipelineInstanceStatus
                            label={item.name}
                            lastRetrieval={moment(item.lastRetrieval).format('MM/DD/YY hh:mm:ss')}
                            navigator={this.props.navigator}
                            piid={item.instanceId}
                            progress={item.progress}
                            onSelectBuild={onSelectBuild}
                            status={item.severity}
                        />
                    )}
                />
            </View>
        );
    }
}
