import React, { useState } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

export const Header = (props) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/images/logo.png')}
        resizeMode='contain'
        accessible={true}
        accessibilityLabel={'Art Quiz Logo'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    // width: '100%',
    // padding: 30,
    justifyContent: 'flex-end'
  },
  image: {
    height: 70,
  }, text: {

  }
});