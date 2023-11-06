import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { MainNavigation } from './Routers/MainNavigation';
import { SplashScreen } from './screens/SplashScreen';
import imagesData from './data/data.json'
import { setArtistsRounds, setPicturesRounds, setColorScheme } from './store/gameSlice';
import { ToastProvider } from 'react-native-toast-notifications'
import { ThemeProvider } from './theme/ThemeContext';
import { setInitialDataToAsyncStorage } from './utils/helpers';

export default function App() {
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
        if (!storage) {
          const data = await setInitialDataToAsyncStorage();
          dispatch(setArtistsRounds(data.artistsRounds));
          dispatch(setPicturesRounds(data.picturesRounds));
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
        <ToastProvider>
          <NavigationContainer>
            <MainNavigation />
          </NavigationContainer>
        </ToastProvider>
      </ThemeProvider>
  );
}