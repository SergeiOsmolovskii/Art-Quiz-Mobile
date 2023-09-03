import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export const HomeScreen = () => {

  return (
    <View style={styles.container}>
      <Text>Home screen</Text>
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