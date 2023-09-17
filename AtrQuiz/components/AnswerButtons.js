import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { currentShuffleQuestionAnswers } from '../utils/helpers';

export const AnswerButtons = ({correctAnswer, imagesData}) => {
  const answers = currentShuffleQuestionAnswers(imagesData, correctAnswer);
  console.log(answers)
  return (
    <View style={styles.container}>
      {answers.map((item, index) => (
        <TouchableOpacity
          style={styles.button}
          key={index}
          onPress={() => {/* Обработчик нажатия на кнопку */}}
        >
          <Text style={styles.buttonText}>{item !== undefined ? item.toString() : ""}</Text>
        </TouchableOpacity>
      ))}


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  }, button: {
    alignItems: 'stretch',
    justifyContent: 'center',
    width: '45%',
    minHeight: 60,
    marginVertical: 10,
    padding: 10,
    backgroundColor: 'pink',
  }, buttonText: {
    textAlign: 'center',
    textTransform: 'none',
    fontWeight: 'bold'
  }
});