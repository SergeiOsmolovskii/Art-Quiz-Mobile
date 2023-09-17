import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { SplashScreen } from './screens/SplashScreen';

import { ARTISTS_ROUNDS, PICTURES_ROUNDS, TOTAL_QUESTIONS_IN_ROUND } from './utils/variables'
import imagesData from './data/data.json'
import { MainNavigation } from './Routers/MainNavigation';

export default function App() {

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
          const data = {
            artistsRounds: Array.from({ length: ARTISTS_ROUNDS }, () => null),
            picturesRounds: Array.from({ length: PICTURES_ROUNDS }, () => null),
            settings: {},
          };

          /* To test */

          // data.artistsRounds[0] = [true, true, false, true, false, false, true, true, false, true];
          // data.artistsRounds[1] = [true, true, true, false, false, false, false, false, false, true];
          // data.artistsRounds[7] = [true, true, true, true, true, true, true, true, false, true];
          // data.artistsRounds[5] = [true, true, true, true,true, true,true, true,true, true];

          AsyncStorage.setItem('storage', JSON.stringify(data));
        }

        if (!images) {
          AsyncStorage.setItem('imagesData', JSON.stringify(imagesData));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return isLoading ? (
    <SplashScreen />
  ) : (
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>
  );
}