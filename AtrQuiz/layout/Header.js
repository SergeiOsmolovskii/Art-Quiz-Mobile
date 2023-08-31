import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';

export const Header = () => {

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
    width: '100%',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: 70,
  }
});