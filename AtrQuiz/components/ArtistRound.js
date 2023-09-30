import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Text, Image } from 'react-native';
import { BASIC_IMAGE_URL } from '../utils/variables';
import { DotIndicators } from './DotIndicators';
import { AnswerButtons } from './AnswerButtons';
import { TOTAL_QUESTIONS_IN_ROUND } from '../utils/variables';

export const ArtistRound = ({roundNumber, questionNumber, setQuestionNumber, imagesData, questionAnswers}) => {

  
  const [questionData, setQuestionData] = useState(imagesData[roundNumber * questionNumber]);

  return (
    <View style={styles.container}>
    <Text style={styles.text}>{questionNumber} / {TOTAL_QUESTIONS_IN_ROUND} </Text>

    <Text style={styles.text}>Who is the author of this picture?</Text>

      <Image
        style={styles.image}
        source={{uri: `${BASIC_IMAGE_URL}${questionData.imageNum}.jpg`}}
        resizeMode='contain'
        accessible={true}
      />
      <DotIndicators questionAnswers={questionAnswers}/>
      <AnswerButtons imagesData={imagesData} questionData={questionData} setQuestionNumber={setQuestionNumber}/>
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