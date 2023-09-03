import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export const AboutScreen = () => {

  return (
    <View style={styles.container}>
      <Text>About screen</Text>
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