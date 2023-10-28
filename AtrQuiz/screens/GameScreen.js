import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, ActivityIndicator  } from 'react-native';
import { ArtistRound } from '../components/ArtistRound';
import { ConfirmNavigation } from '../components/ConfirmNavigation';
import { setImagesData } from '../store/imagesDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../theme/ThemeContext';

export const GameScreen = ({navigation}) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const categoryName = useSelector((state) => state.round.categoryName);
  const roundNumber = useSelector((state) => state.round.roundNumber);
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
    <View style={styles.container(colors.background)}>
      <ConfirmNavigation />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.indicator} />
      ) : (
        <ArtistRound />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: (backgroundColor) => ({
    flex: 1,
    width: '100%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: backgroundColor,
  })
});