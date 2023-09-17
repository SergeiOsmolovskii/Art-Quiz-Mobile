import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Text, Image } from 'react-native';
import { BASIC_IMAGE_URL } from '../utils/variables';
import { DotIndicators } from './DotIndicators';
import { AnswerButtons } from './AnswerButtons';

export const ArtistRound = ({round, questionNumber, imagesData, questionAnswers}) => {

  const correctAnswer = 'Eugene Delacroix'


  return (
    <View style={styles.container}>

    <Text style={styles.text}>Who is the author of this picture?</Text>

      <Image
        style={styles.image}
        source={{uri: `${BASIC_IMAGE_URL}0.jpg`}}
        resizeMode='contain'
        accessible={true}
      />
      <DotIndicators questionAnswers={questionAnswers}/>
      <AnswerButtons imagesData={imagesData} correctAnswer={correctAnswer}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'orange',
  }, text: {
    margin: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  }, image: {
    width: '100%',
    height: '50%'
  }
});