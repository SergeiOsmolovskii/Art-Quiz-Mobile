import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { MainNavigation } from './Routers/MainNavigation';
import { SplashScreen } from './screens/SplashScreen';
import imagesData from './data/data_en.json';
import { setRoundsData, setColorScheme, setVibration, setLocalization } from './store/gameSlice';
import { ToastProvider } from 'react-native-toast-notifications'
import { ThemeProvider } from './theme/ThemeContext';
import { setInitialDataToAsyncStorage } from './utils/helpers';
import i18n from './i18n';

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
        const defaultColorScheme = 'dark';
        const defaultLocalization = 'en';

        if (!storage) {
          const data = await setInitialDataToAsyncStorage(defaultColorScheme, defaultLocalization);

          Object.keys(data.roundsData).forEach((roundType) => {
            dispatch(setRoundsData(roundType, data.roundsData[roundType]));
          });

          dispatch(setColorScheme(data.settings.colorScheme));
          dispatch(setVibration(data.settings.vibration));
          dispatch(setLocalization(defaultLocalization));
        } else {
          const storedData = JSON.parse(storage);

          Object.keys(storedData.roundsData).forEach((roundType) => {
            dispatch(setRoundsData(roundType, storedData.roundsData[roundType]));
          });
          dispatch(setColorScheme(storedData.settings.colorScheme));
          dispatch(setVibration(storedData.settings.vibration));
          dispatch(setLocalization(storedData.settings.localization));
          i18n.changeLanguage(storedData.settings.localization);
        }

        if (!images) {
          await AsyncStorage.setItem('imagesData', JSON.stringify(imagesData));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <ThemeProvider>
      {isLoading ? (
        <SplashScreen />
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          <ToastProvider>
            <NavigationContainer>
              <MainNavigation />
            </NavigationContainer>
          </ToastProvider>
        </SafeAreaView>
      )}
    </ThemeProvider>
  );
}