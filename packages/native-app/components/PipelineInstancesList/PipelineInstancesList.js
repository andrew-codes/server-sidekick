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
                            label={item.name}
                            progress={item.progress}
                        />
                    )}
                />
            </View>
        );
    }
}
