import React from 'react';
import {Text, View, TouchableHighlight} from 'react-native';
import StatusIcon from '../StatusIcon/StatusIcon';
import styles from './styles';

export default class PipelineInstanceStatus extends React.Component {
    onPress = () => {
      this.props.onSelectBuild(this.props.piid)
    };

    render() {
        const {
            label,
            lastRetrieval,
            status
        } = this.props;
        return (
          <TouchableHighlight
            onPress={this.onPress}
            style={{flex: 1}}
            underlayColor="rgba(0,0,0,0.15)"
          >
            <View style={styles.container}>
                <View style={styles.top}>
                    <StatusIcon
                        style={styles.icon}
                        status={status}
                    />
                    <Text style={styles.text1}>{label}</Text>
                    <View/>
                </View>
                <View style={styles.bottom}>
                    <Text style={styles.text2}>{lastRetrieval}</Text>
                </View>
            </View>
          </TouchableHighlight>

        );
    }
}
