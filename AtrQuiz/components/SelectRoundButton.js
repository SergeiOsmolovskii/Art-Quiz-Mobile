import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ImageBackground  } from 'react-native';

export const SelectRoundButton = ({ title, subtitle, imageURL, navigation }) => {

  return (
    <TouchableOpacity style={styles.container} onPress={() => {navigation.navigate(title)}}>
      <ImageBackground
        source={imageURL}
        style={styles.image}
        resizeMode='cover'
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 15,
  }, image: {
    height: 125,
  }, title: {
    margin: 10,
    fontSize: 30,
    fontWeight: 'bold'
  }, subtitle: {
    maxWidth: '40%',
    marginHorizontal: 10,
    fontSize: 16,
    // color: ''
  }
});