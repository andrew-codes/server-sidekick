import React from 'react';
import { Bar } from 'react-native-progress';
import { Text, View } from 'react-native';
import styles from './styles';

export default class PipelineInstanceStatus extends React.Component {
  render() {
    const { item } = this.props;
    const { label, progress, status} = item;
    const barColor = getColor(status);
    return (
      <View>
        <Text style={styles.label}>{label}</Text>
        <Bar style={styles.item}
        progress={progress}
        color={barColor}
        height={15}
        />
      </View>
    );
  }
}

const getColor = (status) => {
  switch (status) {
    case "pending":
    case "processing":
      return "blue";
      break;
    case "canceled":
      return "grey";
      break;
    case "failed":
      return "red";
      break;
    case "succeeded":
      return "green";
      break;
    default:
      return "black";
  }
}
