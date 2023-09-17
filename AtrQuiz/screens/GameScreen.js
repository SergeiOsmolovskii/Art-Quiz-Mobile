import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Text } from 'react-native';
import { ArtistRound } from '../components/ArtistRound';
import { getAllUniqueAuthors } from '../utils/helpers';
import { ConfirmNavigation } from '../components/ConfirmNavigation';

export const GameScreen = ({navigation}) => {

  const [imagesData, setImagesData] = useState([]);

  const [questionNumber, setQuestionNumber] = useState(1);
  const [questionAnswers, setQuestionAnswers] = useState([null, null, null, null, null, null, null, null, null, null]);

  useEffect(() => {
    (async () => {
      try {
        const images = await AsyncStorage.getItem('imagesData');
        setImagesData(JSON.parse(images));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <ConfirmNavigation navigation={navigation} />
      <ArtistRound imagesData={imagesData || []} setQuestionAnswers={setQuestionAnswers} questionAnswers={questionAnswers}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 20,
    backgroundColor: 'green'
  }
});