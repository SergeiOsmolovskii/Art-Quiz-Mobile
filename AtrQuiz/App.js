import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { MainNavigation } from './Routers/MainNavigation';
import { SplashScreen } from './screens/SplashScreen';
import { ARTISTS_ROUNDS, PICTURES_ROUNDS, TOTAL_QUESTIONS_IN_ROUND } from './utils/variables'
import imagesData from './data/data.json'
import { setArtistsRounds, setPicturesRounds, setColorScheme } from './store/gameSlice';
import { ThemeProvider } from './theme/ThemeContext';


export default function App() {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const storage = await AsyncStorage.getItem('storage');
        const images = await AsyncStorage.getItem('imagesData');
        // AsyncStorage.clear();
        if (!storage) {
          const artistsRounds = Array.from({ length: ARTISTS_ROUNDS }, () => null);
          const picturesRounds = Array.from({ length: PICTURES_ROUNDS }, () => null);

          const data = {
            artistsRounds: artistsRounds,
            picturesRounds: picturesRounds,
            settings: {
              colorScheme: colorScheme
            },
          };

          await AsyncStorage.setItem('storage', JSON.stringify(data));
          dispatch(setArtistsRounds(artistsRounds));
          dispatch(setPicturesRounds(picturesRounds));
          dispatch(setColorScheme(data.settings.colorScheme))
        } else {
          dispatch(setArtistsRounds(JSON.parse(storage).artistsRounds));
          dispatch(setPicturesRounds(JSON.parse(storage).picturesRounds));
          dispatch(setColorScheme(JSON.parse(storage).settings.colorScheme));
        }

        if (!images) {
          await AsyncStorage.setItem('imagesData', JSON.stringify(imagesData));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return isLoading ? (
    <SplashScreen />
  ) : (
    <ThemeProvider>
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </ThemeProvider>
  );
}