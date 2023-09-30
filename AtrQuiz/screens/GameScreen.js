import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Text, ActivityIndicator  } from 'react-native';
import { ArtistRound } from '../components/ArtistRound';
import { ConfirmNavigation } from '../components/ConfirmNavigation';

export const GameScreen = ({navigation, route}) => {

  const [imagesData, setImagesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [questionNumber, setQuestionNumber] = useState(1);
  const [questionAnswers, setQuestionAnswers] = useState([null, null, null, null, null, null, null, null, null, null]);

  useEffect(() => {
    (async () => {
      try {
        const images = await AsyncStorage.getItem('imagesData');
        const parsedImages = JSON.parse(images);
        setImagesData(parsedImages);
        setIsLoading(false);
        navigation.setOptions({
          headerTitle: route.params.title,
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <ConfirmNavigation navigation={navigation} />
      {isLoading ? (
      <ActivityIndicator size="large" color="#0000ff" style={styles.indicator}/>
    ) : (
      <ArtistRound imagesData={imagesData} setQuestionAnswers={setQuestionAnswers} questionNumber={questionNumber} setQuestionNumber={setQuestionNumber} questionAnswers={questionAnswers} roundNumber={route.params.roundNumber}/>
    )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  }
});