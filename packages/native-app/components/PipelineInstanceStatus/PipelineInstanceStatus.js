import React from 'react';
import {Image, Text, View, TouchableHighlight} from 'react-native';
import StatusIcon from '../StatusIcon/StatusIcon';
import styles from './styles';

export default class PipelineInstanceStatus extends React.Component {
    onPress = () => {
        this.props.onSelectBuild(this.props.piid)
    };

    onMute = () => {
        this.props.onMute(this.props.piid);
    };

    render() {
        const {
            label,
            lastRetrieval,
            status
        } = this.props;
        return (
            <View style={styles.container}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <View style={{
                        flex: 3,
                    }}>
                        <TouchableHighlight
                            onPress={this.onPress}
                            style={{
                                flex: 1,
                            }}
                            underlayColor="rgba(0,0,0,0.15)"
                        >
                            <View
                                style={{
                                    alignItems: 'center',
                                    flex: 1,
                                    flexDirection: 'row',
                                    padding: 10,
                                }}
                            >
                                <View
                                    style={styles.icon}
                                >
                                    <StatusIcon
                                        status={status}
                                    />
                                </View>
                                <View style={styles.pipelineItem}>
                                    <View style={styles.top}>
                                        <Text style={styles.text1}>{label}</Text>
                                        <View />
                                    </View>
                                    <View>
                                        <View style={styles.bottom}>
                                            <Text style={styles.text2}>{lastRetrieval}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View
                        style={{
                            width: 60,
                        }}>
                        <TouchableHighlight
                            onPress={this.onMute}
                            style={{
                                alignItems: 'center',
                                flex: 1,
                                flexDirection: 'row',
                                padding: 10,
                                paddingLeft: 20,
                            }}
                            underlayColor="rgba(0,0,0,0.15)"
                        >
                            <View style={{
                                alignItems: 'center',
                                display: 'flex',
                            }}>
                                <Image
                                    source={require('../../images/ic_volume_off.png')}
                                    style={{
                                        height: 24,
                                        width: 24,
                                    }}
                                />
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }
}
