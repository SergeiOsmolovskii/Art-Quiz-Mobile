import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export const StatisticsScreen = () => {

  return (
    <View style={styles.container}>
      <Text>Statistics screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center'
  }
});