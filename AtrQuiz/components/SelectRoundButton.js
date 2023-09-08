import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ImageBackground  } from 'react-native';

export const SelectRoundButton = (props) => {
  const { imageName, imageURL } = props;

  return (
    <TouchableOpacity style={styles.container}>
      <ImageBackground 
        source={imageURL}
        style={styles.image}
        resizeMode='cover'
      > 
        <Text style={styles.text}>{imageName}</Text>

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
  }, text: {
    margin: 10,
    fontSize: 30,
    fontWeight: 'bold'
  }
});