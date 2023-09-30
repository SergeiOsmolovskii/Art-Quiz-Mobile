import React, { useState, useMemo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { BASIC_IMAGE_URL } from '../utils/variables';

export const CorrectAnswerPopUp = ({ questionData, onBackdropPress }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{questionData.author}</Text>

      <Image
        style={styles.image}
        source={{uri: `${BASIC_IMAGE_URL}${questionData.imageNum}.jpg`}}
        resizeMode='contain'
        accessible={true}
      />

    <View>
      <Text style={styles.text}>{questionData.name}</Text>
      <Text style={styles.text}>{questionData.year}</Text>
    </View>


      <TouchableOpacity style={styles.button} onPress={onBackdropPress}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '50%',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'plum'
  }, text: {
    margin: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  }, image: {
    width: '100%',
    height: '50%'
  }, button: {
    width: '100%',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'pink',
  }, buttonText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  }
});