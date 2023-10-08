import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, ActivityIndicator  } from 'react-native';
import { ArtistRound } from '../components/ArtistRound';
import { ConfirmNavigation } from '../components/ConfirmNavigation';
import { setImagesData } from '../store/imagesDataSlice';
import { useDispatch, useSelector } from 'react-redux';

export const GameScreen = ({navigation}) => {

  const dispatch = useDispatch();
  const categoryName = useSelector((state) => state.game.categoryName);
  const roundNumber = useSelector((state) => state.game.roundNumber);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const images = await AsyncStorage.getItem('imagesData');
        const parsedImages = JSON.parse(images);
        dispatch(setImagesData(parsedImages));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${categoryName} round ${roundNumber + 1}`,
    });
  }, []);

  return (
    <View style={styles.container}>
      <ConfirmNavigation navigation={navigation} />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.indicator} />
      ) : (
        <ArtistRound navigation={navigation} />
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