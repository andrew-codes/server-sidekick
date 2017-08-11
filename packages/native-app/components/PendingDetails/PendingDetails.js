import React from 'react';
import {Text, View, Button} from 'react-native';
import styles from './styles';

const PendingDetails = (props) => {
    const {
      totalSteps,
      totalSuccess,
      totalSkipped,
      pending,
    } = props;
    const {
      question,
      title
    } = pending;
    return (
      <View>
        <Text style={styles.pending}>Total Skipped Steps: {totalSkipped}</Text>
        <Text style={styles.pending}>Total Successful Steps: {totalSuccess}</Text>
        <Text style={styles.pending}>Total Steps: {totalSteps}</Text>
        <View style={styles.pending}>
          <Text>There is a Pending step:</Text>
          <Text style={styles.pendingDetails}>{title}</Text>
          <Text style={styles.pendingDetails}>{question}</Text>
        </View>
        <Button
          onPress={() => {console.log("kevin is best kevin")}}
          title="Approve"
          color="#09a84c"
        />
        <Button
          onPress={() => {console.log("kevin is best kevin")}}
          title="Deny"
          color="#d52101"
        />
      </View>
    )
}

export default PendingDetails;
