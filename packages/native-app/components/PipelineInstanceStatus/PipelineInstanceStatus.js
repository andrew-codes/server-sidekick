import React from 'react';
import {Bar} from 'react-native-progress';
import {Text, View, TouchableHighlight} from 'react-native';
import StatusIcon from '../StatusIcon/StatusIcon';
import styles from './styles';
import PipelineDetails from '../PipelineDetails/PipelineDetails';

export default class PipelineInstanceStatus extends React.Component {
    onPress = () => {
      this.props.navigator.push({
        component: PipelineDetails,
        title: `Details for ${this.props.label}`,
        passProps: { myProp: 'genius' },
      });
    }

    render() {
        const {
            label,
            lastRetrieval,
            progress,
            status
        } = this.props;
        return (
          <TouchableHighlight
            onPress={this.onPress}
            style={{flex: 1}}
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

// <Bar style={styles.item}
//      progress={progress}
// />
